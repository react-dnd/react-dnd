'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragDropStore = require('../stores/DragDropStore'),
    HorizontalDragAnchors = require('../constants/HorizontalDragAnchors'),
    VerticalDragAnchors = require('../constants/VerticalDragAnchors'),
    bindAll = require('../utils/bindAll'),
    invariant = require('react/lib/invariant'),
    merge = require('react/lib/merge'),
    shallowEqual = require('react/lib/shallowEqual'),
    union = require('lodash-node/modern/arrays/union'),
    without = require('lodash-node/modern/arrays/without'),
    isObject = require('lodash-node/modern/objects/isObject');

// FIXME: this mixin is getting too fat.

// Move utilities to ../utils and separate HTML5 "backend" from the
// common logic so we can add touchmove/translateY backend and whatnot.

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isFirefox() {
  return /firefox/i.test(navigator.userAgent);
}

function isSafari() {
  return !!window.safari;
}

function isWebkit() {
  return 'WebkitAppearance' in document.documentElement.style;
}

function shouldUseDragPreview(dragPreview) {
  if (!dragPreview) {
    return false;
  }

  if (isSafari() && dragPreview instanceof Image && endsWith(dragPreview.src, '.gif')) {
    // GIFs crash Safari
    return false;
  }

  return true;
}

/**
 * Returns offset to be used as arguments for `dataTransfer.setDragImage(dragImage, x, y)`.
 * Attempts to work around browser differences, especially on high-DPI screens.
 */
function getDragImageOffset(containerNode, dragPreview, dragAnchors, e) {
  dragAnchors = dragAnchors || {};

  var containerWidth = containerNode.offsetWidth,
      containerHeight = containerNode.offsetHeight,
      isImage = dragPreview instanceof Image,
      previewWidth = isImage ? dragPreview.width : containerWidth,
      previewHeight = isImage ? dragPreview.height : containerHeight,
      horizontalAnchor = dragAnchors.horizontal || HorizontalDragAnchors.CENTER,
      verticalAnchor = dragAnchors.vertical || VerticalDragAnchors.CENTER,
      { offsetX, offsetY } = e;

  // Work around @2x coordinate discrepancies in browsers
  if (isFirefox()) {
    offsetX = e.layerX;
    offsetY = e.layerY;
  } else if (isSafari()) {
    previewHeight /= window.devicePixelRatio;
    previewWidth /= window.devicePixelRatio;
  }

  switch (horizontalAnchor) {
  case HorizontalDragAnchors.LEFT:
    break;
  case HorizontalDragAnchors.CENTER:
    offsetX *= (previewWidth / containerWidth);
    break;
  case HorizontalDragAnchors.RIGHT:
    offsetX = previewWidth - previewWidth * (1 - offsetX / containerWidth);
    break;
  }

  switch (verticalAnchor) {
  case VerticalDragAnchors.TOP:
    break;
  case VerticalDragAnchors.CENTER:
    offsetY *= (previewHeight / containerHeight);
    break;
  case VerticalDragAnchors.BOTTOM:
    offsetY = previewHeight - previewHeight * (1 - offsetY / containerHeight);
    break;
  }

  // Work around Safari 8 positioning bug
  if (isSafari()) {
    // We'll have to wait for @3x to see if this is entirely correct
    offsetY += (window.devicePixelRatio - 1) * previewHeight;
  }

  return {
    x: offsetX,
    y: offsetY
  };
}

function calculateDragPreviewSize(desiredSize) {
  var size = {
    width: desiredSize.width,
    height: desiredSize.height
  };

  if (isFirefox() || isSafari()) {
    size.width *= window.devicePixelRatio;
    size.height *= window.devicePixelRatio;
  }

  return size;
}

function configureDataTransfer(containerNode, nativeEvent, dragOptions) {
  var { dataTransfer } = nativeEvent,
      { dragPreview, effectAllowed, dragAnchors } = dragOptions;

  try {
    // Firefox won't drag without setting data
    dataTransfer.setData('application/json', {});
  } catch (err) {
    // IE doesn't support MIME types in setData
  }

  if (shouldUseDragPreview(dragPreview) && dataTransfer.setDragImage) {
    var dragOffset = getDragImageOffset(containerNode, dragPreview, dragAnchors, nativeEvent);
    dataTransfer.setDragImage(dragPreview, dragOffset.x, dragOffset.y);
  }

  dataTransfer.effectAllowed = effectAllowed;
}


/**
 * Webkit animates items to their initial positions if drop wasn't handled:
 * https://github.com/gaearon/react-dnd/issues/8
 *
 * This can be a pain if dragged item's DOM node was moved itself.
 *
 * We have to store these globally so we can check if dragged item's
 * client rect has changed after drag started. We do this in window's
 * dragover handler, and cancel the drag animation so it doesn't animate
 * to the wrong (initial) position.
 */
var _currentDragTarget,
    _initialDragTargetRect,
    _handleCurrentDragEnd,
    _dragTargetRectDidChange;

function getElementRect(el) {
  var rect = el.getBoundingClientRect();
  // Copy so object doesn't get reused
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

function setGlobalDragState(dragTarget, handleDragEnd) {
  _currentDragTarget = dragTarget;
  _initialDragTargetRect = getElementRect(dragTarget);
  _dragTargetRectDidChange = false;
  _handleCurrentDragEnd = handleDragEnd;
}

function checkIfCurrentDragTargetRectChanged() {
  if (!_dragTargetRectDidChange) {
    var currentRect = getElementRect(_currentDragTarget);
    _dragTargetRectDidChange = !shallowEqual(_initialDragTargetRect, currentRect);
  }

  return _dragTargetRectDidChange;
}

function resetGlobalDragState() {
  _currentDragTarget = null;
  _initialDragTargetRect = null;
  _dragTargetRectDidChange = false;
  _handleCurrentDragEnd = null;
}

if (isWebkit()) {
  window.addEventListener('dragover', function (e) {
    if (_currentDragTarget && checkIfCurrentDragTargetRectChanged()) {
      // Prevent animating to incorrect position
      e.preventDefault();
    }
  });
}

/**
 * If source node is removed during drag, its `dragend` won't fire.
 * We will attempt to fire it ourselves when global `drop` occurs.
 */
function triggerDragEndIfDragSourceWasRemovedFromDOM() {
  if (_currentDragTarget &&
      _handleCurrentDragEnd &&
      !document.contains(_currentDragTarget)) {

    _handleCurrentDragEnd();
  }
}

if (!isFirefox()) {
  window.addEventListener('drop', triggerDragEndIfDragSourceWasRemovedFromDOM);
} else {

  // Firefox won't trigger a global `drop` if source node was removed.
  // It won't trigger `mouseup` either. It *will* however trigger `dragover`
  // continually during drag, so our strategy is to simply wait until `dragover`
  // has stopped firing.

  var _lastDragSourceCheckTimeout = null;

  window.addEventListener('dragover', function () {
    if (!_currentDragTarget) {
      return;
    }

    clearTimeout(_lastDragSourceCheckTimeout);

    _lastDragSourceCheckTimeout = setTimeout(
      triggerDragEndIfDragSourceWasRemovedFromDOM,
      140 // 70 seems enough on OS X with FF33, double it to be sure
    );
  });
}



/**
 * Use this mixin to define drag sources and drop targets.
 */
var DragDropMixin = {
  getInitialState() {
    var state = {
      ownDraggedItemType: null,
      hasDragEntered: false
    };

    return merge(state, this.getStateFromDragDropStore());
  },

  getActiveDropTargetType() {
    var { draggedItemType, draggedItem, ownDraggedItemType } = this.state,
        dropTarget = this._dropTargets[draggedItemType];

    if (!dropTarget) {
      return null;
    }

    if (draggedItemType === ownDraggedItemType) {
      return null;
    }

    var { canDrop } = dropTarget;
    if (!canDrop || canDrop(draggedItem)) {
      return draggedItemType;
    } else {
      return null;
    }
  },

  isAnyDropTargetActive(types) {
    return types.indexOf(this.getActiveDropTargetType()) > -1;
  },

  getStateFromDragDropStore() {
    return {
      draggedItem: DragDropStore.getDraggedItem(),
      draggedItemType: DragDropStore.getDraggedItemType()
    };
  },

  getDragState(type) {
    invariant(this._dragSources[type], 'No drag source for %s', type);

    return {
      isDragging: this.state.ownDraggedItemType === type
    };
  },

  getDropState(type) {
    invariant(this._dropTargets[type], 'No drop target for %s', type);

    var isDragging = this.getActiveDropTargetType() === type,
        hasDragEntered = this.state.hasDragEntered;

    return {
      isDragging: isDragging,
      isHovering: isDragging && hasDragEntered
    };
  },

  componentWillMount() {
    this._dragEntered = [];
    this._dragSources = {};
    this._dropTargets = {};
    this.configureDragDrop(this.registerDragDropItemTypeHandlers);
  },

  componentDidMount() {
    DragDropStore.addChangeListener(this.handleDragDropStoreChange);
  },

  componentWillUnmount() {
    DragDropStore.removeChangeListener(this.handleDragDropStoreChange);
  },

  calculateDragPreviewSize: calculateDragPreviewSize,

  registerDragDropItemTypeHandlers(type, handlers) {
    var { dragSource, dropTarget } = handlers;

    if (dragSource) {
      invariant(!this._dragSources[type], 'Drag source for %s specified twice', type);
      this._dragSources[type] = bindAll(dragSource, this);
    }

    if (dropTarget) {
      invariant(!this._dropTargets[type], 'Drop target for %s specified twice', type);
      this._dropTargets[type] = bindAll(dropTarget, this);
    }
  },

  handleDragDropStoreChange() {
    this.setState(this.getStateFromDragDropStore());
  },

  dragSourceFor(type) {
    invariant(this._dragSources[type], 'No drag source for %s', type);

    // TODO: optimize by caching binds
    return {
      draggable: true,
      onDragStart: this.handleDragStart.bind(this, type),
      onDragEnd: this.handleDragEnd.bind(this, type)
    };
  },

  handleDragStart(type, e) {
    var { canDrag, beginDrag } = this._dragSources[type];

    if (canDrag && !canDrag(e)) {
      e.preventDefault();
      return;
    }

    // Some browser-specific fixes rely on knowing
    // current dragged element and its dragend handler.
    setGlobalDragState(
      e.target,
      this.handleDragEnd.bind(this, type, null)
    );

    var dragOptions = beginDrag(e),
        { item } = dragOptions;

    configureDataTransfer(this.getDOMNode(), e.nativeEvent, dragOptions);
    invariant(isObject(item), 'Expected return value of beginDrag to contain "item" object');

    this.setState({
      ownDraggedItemType: type
    });

    DragDropActionCreators.startDragging(type, item);
  },

  handleDragEnd(type, e) {

    // Note: this method may be invoked even *after* component was unmounted
    // This happens if source node was removed from DOM while dragging.

    // We mustn't assume being mounted, but still need to gracefully reset state.
    // See `triggerDragEndIfDragSourceWasRemovedFromDOM` above.

    resetGlobalDragState();

    if (this.isMounted()) {
      this.setState({
        ownDraggedItemType: null
      });
    }

    var { endDrag } = this._dragSources[type],
        didDrop = DragDropStore.didDrop();

    DragDropActionCreators.endDragging();

    if (endDrag) {
      endDrag(didDrop, e);
    }
  },

  dropTargetFor(...types) {
    types.forEach(type => {
      invariant(this._dropTargets[type], 'No drop target for %s', type);
    });

    // TODO: optimize by caching binds
    return {
      onDragEnter: this.handleDragEnter.bind(this, types),
      onDragOver: this.handleDragOver.bind(this, types),
      onDragLeave: this.handleDragLeave.bind(this, types),
      onDrop: this.handleDrop.bind(this, types)
    };
  },

  handleDragOver(types, e) {
    if (!this.isAnyDropTargetActive(types)) {
      return;
    }

    e.preventDefault();

    var { over } = this._dropTargets[this.state.draggedItemType];
    if (over) {
      over(this.state.draggedItem, e);
    }
  },

  handleDragEnter(types, e) {
    if (!this.isAnyDropTargetActive(types)) {
      return;
    }

    if (!this._dragEntered.length) {
      this.setState({
        hasDragEntered: true
      });

      var { enter } = this._dropTargets[this.state.draggedItemType];
      if (enter) {
        enter(this.state.draggedItem, e);
      }
    }

    this._dragEntered = union(this._dragEntered, [e.target]);
  },

  handleDragLeave(types, e) {
    if (!this.isAnyDropTargetActive(types)) {
      return;
    }

    this._dragEntered = without(this._dragEntered, e.target);
    this._dragEntered = this._dragEntered.filter(node => document.contains(node));

    if (!this._dragEntered.length) {
      this.setState({
        hasDragEntered: false
      });

      var { leave } = this._dropTargets[this.state.draggedItemType];
      if (leave) {
        leave(this.state.draggedItem, e);
      }
    }
  },

  handleDrop(types, e) {
    if (!this.isAnyDropTargetActive(types)) {
      return;
    }

    e.preventDefault();

    var item = DragDropStore.getDraggedItem(),
        { acceptDrop } = this._dropTargets[this.state.draggedItemType];

    this._dragEntered = [];
    this.setState({
      hasDragEntered: false
    });

    if (!acceptDrop || acceptDrop(item, e) !== false) {
      DragDropActionCreators.recordDrop();
    }
  }
};

module.exports = DragDropMixin;
