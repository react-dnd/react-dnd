"use strict";

var DragDropActionCreators = require("../actions/DragDropActionCreators"),
    DragOperationStore = require("../stores/DragOperationStore"),
    NativeDragItemTypes = require("../constants/NativeDragItemTypes"),
    EnterLeaveMonitor = require("../utils/EnterLeaveMonitor"),
    isFileDragDropEvent = require("../utils/isFileDragDropEvent"),
    isUrlDragDropEvent = require("../utils/isUrlDragDropEvent"),
    isNativeDraggedItemType = require("../utils/isNativeDraggedItemType"),
    configureDataTransfer = require("../utils/configureDataTransfer"),
    shallowEqual = require("react/lib/shallowEqual"),
    isWebkit = require("../utils/isWebkit");

var ELEMENT_NODE = 1;

// Store global state for browser-specific fixes and workarounds
var _monitor = new EnterLeaveMonitor(),
    _currentDragTarget,
    _currentComponent,
    _initialDragTargetRect,
    _dragTargetRectDidChange,
    _currentDropEffect;

function getElementRect(el) {
  if (el.nodeType !== ELEMENT_NODE) {
    el = el.parentElement;
  }

  if (!el) {
    return null;
  }

  var rect = el.getBoundingClientRect();
  // Copy so object doesn't get reused
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

function getClientOffset(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
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

  var type = DragOperationStore.getDraggedItemType();
  _currentComponent.handleDragEnd(type, null);
}

function isDraggingNativeItem() {
  var itemType = DragOperationStore.getDraggedItemType();
  return isNativeDraggedItemType(itemType);
}

function handleTopDragStart(e) {
  if (DragOperationStore.isDragging()) {
    return;
  }

  if (isUrlDragDropEvent(e)) {
    // URL dragged from inside the document
    DragDropActionCreators.startDragging(NativeDragItemTypes.URL, null);
  } else {
    // If by this time no drag source reacted, tell browser not to drag.
    e.preventDefault();
  }
}

function handleTopDragEnterCapture(e) {
  // IE requires this to not show a nodrag icon over the container
  e.preventDefault();

  var isFirstEnter = _monitor.enter(e.target);
  if (!isFirstEnter || DragOperationStore.isDragging()) {
    return;
  }

  // It is important to try to catch these at capture phase.
  // This is currently the only way to have drop zones recognize
  // they're being hovered if they fill the screen completely.

  if (isFileDragDropEvent(e)) {
    // File dragged from outside the document
    DragDropActionCreators.startDragging(NativeDragItemTypes.FILE, null);
  } else if (isUrlDragDropEvent(e)) {
    // URL dragged from outside the document
    DragDropActionCreators.startDragging(NativeDragItemTypes.URL, null);
  }
}

function handleTopDragOver(e) {
  if (isDraggingNativeItem()) {
    e.preventDefault();
  }

  var offsetFromClient = getClientOffset(e);
  DragDropActionCreators.drag(offsetFromClient);

  // At the top level of event bubbling, use previously set drop effect and reset it.
  if (_currentDropEffect) {
    e.dataTransfer.dropEffect = _currentDropEffect;
    _currentDropEffect = null;
  }

  if (_currentDragTarget && isWebkit() && checkIfCurrentDragTargetRectChanged()) {
    // Prevent animating to incorrect position
    e.preventDefault();
  }
}

function handleTopDragLeaveCapture(e) {
  if (isDraggingNativeItem()) {
    e.preventDefault();
  }

  var isLastLeave = _monitor.leave(e.target);
  if (!isLastLeave || !isDraggingNativeItem()) {
    return;
  }

  DragDropActionCreators.endDragging();
}

function handleTopDrop(e) {
  if (isDraggingNativeItem()) {
    e.preventDefault();
  }

  _monitor.reset();

  if (isDraggingNativeItem()) {
    DragDropActionCreators.endDragging();
  }

  triggerDragEndIfDragSourceWasRemovedFromDOM();
}

var HTML5 = {
  setup: function setup() {
    if (typeof window === "undefined") {
      return;
    }

    window.addEventListener("dragstart", handleTopDragStart);
    window.addEventListener("dragenter", handleTopDragEnterCapture, true);
    window.addEventListener("dragleave", handleTopDragLeaveCapture, true);
    window.addEventListener("dragover", handleTopDragOver);
    window.addEventListener("drop", handleTopDrop);
  },

  teardown: function teardown() {
    if (typeof window === "undefined") {
      return;
    }

    window.removeEventListener("dragstart", handleTopDragStart);
    window.removeEventListener("dragenter", handleTopDragEnterCapture, true);
    window.removeEventListener("dragleave", handleTopDragLeaveCapture, true);
    window.removeEventListener("dragover", handleTopDragOver);
    window.removeEventListener("drop", handleTopDrop);
  },

  beginDrag: function beginDrag(component, e, containerNode, dragPreview, dragAnchors, offsetFromContainer, effectsAllowed) {
    var _e$nativeEvent = e.nativeEvent;
    var dataTransfer = _e$nativeEvent.dataTransfer;
    var target = _e$nativeEvent.target;
    configureDataTransfer(dataTransfer, containerNode, dragPreview, dragAnchors, offsetFromContainer, effectsAllowed);

    _currentComponent = component;
    _currentDragTarget = target;
    _initialDragTargetRect = getElementRect(target);
    _dragTargetRectDidChange = false;

    // Mouse event tell us that dragging has ended but `dragend` didn't fire.
    // This may happen if source DOM was removed while dragging.

    window.addEventListener("mousemove", triggerDragEndIfDragSourceWasRemovedFromDOM, true);
  },

  endDrag: function endDrag() {
    _currentDragTarget = null;
    _currentComponent = null;
    _initialDragTargetRect = null;
    _dragTargetRectDidChange = false;

    window.removeEventListener("mousemove", triggerDragEndIfDragSourceWasRemovedFromDOM, true);
  },

  dragOver: function dragOver(component, e, dropEffect) {
    // As event bubbles top-down, first specified effect will be used
    if (!_currentDropEffect) {
      _currentDropEffect = dropEffect;
    }
  },

  getDragSourceProps: function getDragSourceProps(component, type) {
    return {
      draggable: true,
      onDragStart: component.handleDragStart.bind(component, type),
      onDragEnd: component.handleDragEnd.bind(component, type)
    };
  },

  getDropTargetProps: function getDropTargetProps(component, types) {
    return {
      onDragEnter: component.handleDragEnter.bind(component, types),
      onDragOver: component.handleDragOver.bind(component, types),
      onDragLeave: component.handleDragLeave.bind(component, types),
      onDrop: component.handleDrop.bind(component, types)
    };
  },

  getOffsetFromClient: function getOffsetFromClient(component, e) {
    return getClientOffset(e);
  }
};

module.exports = HTML5;