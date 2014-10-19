'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragOrigins = require('../constants/DragOrigins'),
    DragDropStore = require('../stores/DragDropStore'),
    bindAll = require('../utils/bindAll'),
    invariant = require('react/lib/invariant'),
    merge = require('react/lib/merge'),
    union = require('lodash-node/modern/arrays/union'),
    without = require('lodash-node/modern/arrays/without'),
    isObject = require('lodash-node/modern/objects/isObject');

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function isFirefox() {
  return /firefox/i.test(navigator.userAgent);
}

function isSafari() {
  return !!window.safari;
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

function getDragImageOffset(dragPreview, dragOrigin, e) {
  var containerWidth = e.target.offsetWidth,
      containerHeight = e.target.offsetHeight,
      isImage = dragPreview instanceof Image,
      previewWidth = isImage ? dragPreview.width : containerWidth,
      previewHeight = isImage ? dragPreview.height : containerHeight,
      offsetX = e.offsetX,
      offsetY = e.offsetY;

  if (isFirefox()) {
    offsetX = e.layerX * window.devicePixelRatio;
    offsetY = e.layerY * window.devicePixelRatio;
  }

  switch (dragOrigin) {
  case DragOrigins.TOP:
    break;
  case DragOrigins.CENTER:
    offsetX *= (previewWidth / containerWidth);
    offsetY *= (previewHeight / containerHeight);
    break;
  default:
    throw new Error('Unknown drag origin: ' + dragOrigin);
  }

  // TODO: Safari 8

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

  if (isFirefox()) {
    size.width *= window.devicePixelRatio;
    size.height *= window.devicePixelRatio;
  }

  // TODO: Safari 8

  return size;
}

function configureDataTransfer(nativeEvent, dragOptions) {
  var { dataTransfer } = nativeEvent,
      { dragPreview, dragOrigin, effectAllowed } = dragOptions;

  try {
    // Firefox won't drag without setting data
    dataTransfer.setData('application/json', {});
  } catch (err) {
    // IE doesn't support MIME types in setData
  }

  if (shouldUseDragPreview(dragPreview) && dataTransfer.setDragImage) {
    var dragOffset = getDragImageOffset(dragPreview, dragOrigin || DragOrigins.CENTER, nativeEvent);
    dataTransfer.setDragImage(dragPreview, dragOffset.x, dragOffset.y);
  }

  dataTransfer.effectAllowed = effectAllowed;
}

var DragDropMixin = {
  getInitialState() {
    var state = {
      ownDraggedItemType: null,
      hasDragEntered: false
    };

    return merge(state, this.getStateFromDragDropStore());
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

    var isDragging = this.state.draggedItemType === type,
        acceptsType = this._dropTargets.hasOwnProperty(type) && type !== this.state.ownDraggedItemType,
        hasDragEntered = this.state.hasDragEntered;

    return {
      isDragging: isDragging && acceptsType,
      isHovering: isDragging && acceptsType && hasDragEntered
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

    var dragOptions = beginDrag(e),
        { item } = dragOptions;

    configureDataTransfer(e.nativeEvent, dragOptions);
    invariant(isObject(item), 'Expected return value of beginDrag to contain "item" object');

    this.setState({
      ownDraggedItemType: type
    });

    DragDropActionCreators.startDragging(type, item);
  },

  handleDragEnd(type, e) {
    this.setState({
      ownDraggedItemType: null
    });

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

  isDropTargetActive(types) {
    var { draggedItemType, ownDraggedItemType } = this.state;

    return types.indexOf(draggedItemType) > -1 &&
           draggedItemType !== ownDraggedItemType;
  },

  handleDragOver(types, e) {
    if (!this.isDropTargetActive(types)) {
      return;
    }

    e.preventDefault();

    var { over } = this._dropTargets[this.state.draggedItemType];
    if (over) {
      over(this.state.draggedItem, e);
    }
  },

  handleDragEnter(types, e) {
    if (!this.isDropTargetActive(types)) {
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
    if (!this.isDropTargetActive(types)) {
      return;
    }

    this._dragEntered = without(this._dragEntered, e.target);

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
    if (!this.isDropTargetActive(types)) {
      return;
    }

    e.preventDefault();

    var item = DragDropStore.getDraggedItem(),
        { acceptDrop } = this._dropTargets[this.state.draggedItemType];

    this._dragEntered = [];
    this.setState({
      hasDragEntered: false
    });

    if (acceptDrop) {
      acceptDrop(item, e);
    }

    DragDropActionCreators.recordDrop();
  }
};

module.exports = DragDropMixin;