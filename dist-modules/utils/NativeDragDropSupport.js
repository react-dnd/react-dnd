'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    NativeDragItemTypes = require('../constants/NativeDragItemTypes'),
    DropEffects = require('../constants/DropEffects'),
    EnterLeaveMonitor = require('../utils/EnterLeaveMonitor'),
    isFileDragDropEvent = require('./isFileDragDropEvent'),
    shallowEqual = require('react/lib/shallowEqual'),
    union = require('lodash-node/modern/arrays/union'),
    without = require('lodash-node/modern/arrays/without'),
    isWebkit = require('./isWebkit'),
    isFirefox = require('./isFirefox');

// Store global state for browser-specific fixes and workarounds
var _monitor = new EnterLeaveMonitor(),
    _currentDragTarget,
    _initialDragTargetRect,
    _imitateCurrentDragEnd,
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
  if (_currentDragTarget &&
      _imitateCurrentDragEnd &&
      !document.body.contains(_currentDragTarget)) {

    _imitateCurrentDragEnd();
  }
}

function preventDefaultFileDropAction(e) {
  if (isFileDragDropEvent(e)) {
    e.preventDefault();
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('dragenter', function (e) {
    preventDefaultFileDropAction(e);

    var isFirstEnter = _monitor.enter(e.target);
    if (isFirstEnter && isFileDragDropEvent(e)) {
      DragDropActionCreators.startDragging(NativeDragItemTypes.FILE, null);
    }
  });

  window.addEventListener('dragover', function (e) {
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
  });

  window.addEventListener('dragleave', function (e) {
    preventDefaultFileDropAction(e);

    var isLastLeave = _monitor.leave(e.target);
    if (isLastLeave && isFileDragDropEvent(e)) {
      DragDropActionCreators.endDragging();
    }
  });

  window.addEventListener('drop', function (e) {
    preventDefaultFileDropAction(e);

    _monitor.reset();

    if (isFileDragDropEvent(e)) {
      DragDropActionCreators.endDragging();
    }

    triggerDragEndIfDragSourceWasRemovedFromDOM();
  });
}

var NativeDragDropSupport = {
  handleDragStart:function(dragTarget, imitateDragEnd) {
    _currentDragTarget = dragTarget;
    _initialDragTargetRect = getElementRect(dragTarget);
    _dragTargetRectDidChange = false;
    _imitateCurrentDragEnd = imitateDragEnd;

    // Mouse event tell us that dragging has ended but `dragend` didn't fire.
    // This may happen if source DOM was removed while dragging.

    window.addEventListener('mousemove', triggerDragEndIfDragSourceWasRemovedFromDOM);
    window.addEventListener('mousein', triggerDragEndIfDragSourceWasRemovedFromDOM);
  },

  handleDragEnd:function() {
    _currentDragTarget = null;
    _initialDragTargetRect = null;
    _dragTargetRectDidChange = false;
    _imitateCurrentDragEnd = null;

    window.removeEventListener('mousemove', triggerDragEndIfDragSourceWasRemovedFromDOM);
    window.removeEventListener('mousein', triggerDragEndIfDragSourceWasRemovedFromDOM);
  },

  handleDragOver:function(e, dropEffect) {
    // As event bubbles top-down, first specified effect will be used
    if (!_currentDropEffect) {
      _currentDropEffect = dropEffect;
    }
  }
};

module.exports = NativeDragDropSupport;