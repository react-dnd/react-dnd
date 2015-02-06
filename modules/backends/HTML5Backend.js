'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragDropStore = require('../stores/DragDropStore'),
    NativeDragItemTypes = require('../constants/NativeDragItemTypes'),
    DropEffects = require('../constants/DropEffects'),
    EnterLeaveMonitor = require('../utils/EnterLeaveMonitor'),
    isFileDragDropEvent = require('../utils/isFileDragDropEvent'),
    configureDataTransfer = require('../utils/configureDataTransfer'),
    shallowEqual = require('react/lib/shallowEqual'),
    union = require('lodash-node/modern/arrays/union'),
    without = require('lodash-node/modern/arrays/without'),
    isWebkit = require('../utils/isWebkit'),
    isFirefox = require('../utils/isFirefox');

// Store global state for browser-specific fixes and workarounds
var _monitor = new EnterLeaveMonitor(),
    _currentDragTarget,
    _currentComponent,
    _initialDragTargetRect,
    _dragTargetRectDidChange,
    _currentDropEffect;

function getElementRect(el) {
  var rect = el.getBoundingClientRect();
  // Copy so object doesn't get reused
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

function checkIfCurrentDragTargetRectChanged() {
  if (!_dragTargetRectDidChange) {
    var currentRect = getElementRect(_currentDragTarget);
    _dragTargetRectDidChange = !shallowEqual(_initialDragTargetRect, currentRect);
  }

  return _dragTargetRectDidChange;
}

function triggerDragEndIfDragSourceWasRemovedFromDOM() {
  if (!_currentComponent || document.body.contains(_currentDragTarget)) {
    return;
  }

  var type = DragDropStore.getDraggedItemType();
  _currentComponent.handleDragEnd(type, null);
}

function preventDefaultFileDropAction(e) {
  if (isFileDragDropEvent(e)) {
    e.preventDefault();
  }
}

function handleTopDragEnter(e) {
  preventDefaultFileDropAction(e);

  var isFirstEnter = _monitor.enter(e.target);
  if (isFirstEnter && isFileDragDropEvent(e)) {
    DragDropActionCreators.startDragging(NativeDragItemTypes.FILE, null);
  }
}

function handleTopDragOver(e) {
  preventDefaultFileDropAction(e);

  // At the top level of event bubbling, use previously set drop effect and reset it.
  if (_currentDropEffect) {
    e.dataTransfer.dropEffect = _currentDropEffect;
    _currentDropEffect = null;
  }

  if (!_currentDragTarget) {
    return;
  }

  if (isWebkit() && checkIfCurrentDragTargetRectChanged()) {
    // Prevent animating to incorrect position
    e.preventDefault();
  }
}

function handleTopDragLeave(e) {
  preventDefaultFileDropAction(e);

  var isLastLeave = _monitor.leave(e.target);
  if (isLastLeave && isFileDragDropEvent(e)) {
    DragDropActionCreators.endDragging();
  }
}

function handleTopDrop(e) {
  preventDefaultFileDropAction(e);

  _monitor.reset();

  if (isFileDragDropEvent(e)) {
    DragDropActionCreators.endDragging();
  }

  triggerDragEndIfDragSourceWasRemovedFromDOM();
}

var HTML5Backend = {
  setup() {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('dragenter', handleTopDragEnter);
    window.addEventListener('dragover', handleTopDragOver);
    window.addEventListener('dragleave', handleTopDragLeave);
    window.addEventListener('drop', handleTopDrop);
  },

  teardown() {
    if (typeof window === 'undefined') {
      return;
    }

    window.removeEventListener('dragenter', handleTopDragEnter);
    window.removeEventListener('dragover', handleTopDragOver);
    window.removeEventListener('dragleave', handleTopDragLeave);
    window.removeEventListener('drop', handleTopDrop);
  },

  // TODO: consolidate options
  beginDrag(component, e, containerNode, dragPreview, dragAnchors, dragStartOffset, effectsAllowed) {
    var { nativeEvent: { dataTransfer, target } } = e;
    configureDataTransfer(dataTransfer, containerNode, dragPreview, dragAnchors, dragStartOffset, effectsAllowed);

    _currentComponent = component;
    _currentDragTarget = target;
    _initialDragTargetRect = getElementRect(target);
    _dragTargetRectDidChange = false;

    // Mouse event tell us that dragging has ended but `dragend` didn't fire.
    // This may happen if source DOM was removed while dragging.

    window.addEventListener('mousemove', triggerDragEndIfDragSourceWasRemovedFromDOM);
    window.addEventListener('mousein', triggerDragEndIfDragSourceWasRemovedFromDOM);
  },

  endDrag(component) {
    _currentDragTarget = null;
    _currentComponent = null;
    _initialDragTargetRect = null;
    _dragTargetRectDidChange = false;

    window.removeEventListener('mousemove', triggerDragEndIfDragSourceWasRemovedFromDOM);
    window.removeEventListener('mousein', triggerDragEndIfDragSourceWasRemovedFromDOM);
  },

  dragOver(component, e, dropEffect) {
    // As event bubbles top-down, first specified effect will be used
    if (!_currentDropEffect) {
      _currentDropEffect = dropEffect;
    }
  },

  getDragSourceProps(component, type) {
    // TODO: optimize bind when we figure this out
    return {
      draggable: true,
      onDragStart: component.handleDragStart.bind(component, type),
      onDrag: component.handleDrag.bind(component, type),
      onDragEnd: component.handleDragEnd.bind(component, type)
    };
  },

  getDropTargetProps(component, types) {
    // TODO: optimize bind when we figure this out
    return {
      onDragEnter: component.handleDragEnter.bind(component, types),
      onDragOver: component.handleDragOver.bind(component, types),
      onDragLeave: component.handleDragLeave.bind(component, types),
      onDrop: component.handleDrop.bind(component, types)
    };
  }
};

module.exports = HTML5Backend;
