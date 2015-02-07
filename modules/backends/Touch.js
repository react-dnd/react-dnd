'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragDropStore = require('../stores/DragDropStore'),
    getMouseCoordinates = require('../utils/getMouseCoordinates');

var _currentComponent,
    _currentDragTarget;

function handleTouchMove(e) {
  var { targetTouches } = e;
  if (!targetTouches.length) {
    return;
  }

  var touch = targetTouches[0];
  DragDropActionCreators.drag({ x: touch.pageX, y: touch.pageY });
}

function handleTouchEnd() {
  var type = DragDropStore.getDraggedItemType();
  _currentComponent.handleDragEnd(type, null);
}

var Touch = {
  setup() {
  },

  teardown() {
  },

  beginDrag(component, e, containerNode, dragPreview, dragAnchors, dragStartOffset, effectsAllowed) {
    _currentComponent = component;
    _currentDragTarget = component.getDOMNode();

    _currentDragTarget.addEventListener('touchmove', handleTouchMove);
    _currentDragTarget.addEventListener('touchend', handleTouchEnd);
  },

  endDrag() {
    _currentDragTarget.removeEventListener('touchmove', handleTouchMove);
    _currentDragTarget.removeEventListener('touchend', handleTouchEnd);

    _currentComponent = null;
    _currentDragTarget = null;
  },

  dragOver(e, dropEffect) {
  },

  getDragSourceProps(component, type) {
    // TODO: optimize bind when we figure this out
    return {
      onTouchStart: component.handleDragStart.bind(component, type),
    };
  },

  getDropTargetProps(component, types) {
    // TODO
    return {};
  },

  getDragClientOffset(e) {
    var { targetTouches } = e;
    if (!targetTouches.length) {
      // TODO: we need to be able to disallow dragging from inside a backend
      throw new Error('Not really implemented yet.');
    }

    e.preventDefault();

    return {
      x: e.targetTouches[0].clientX + window.scrollX,
      y: e.targetTouches[0].clientY + window.scrollY
    };
  }
};

module.exports = Touch;
