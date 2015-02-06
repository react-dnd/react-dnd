'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragDropStore = require('../stores/DragDropStore'),
    getMouseCoordinates = require('../utils/getMouseCoordinates');

var _currentComponent;

function handleTopMouseMove(e) {
  var coordinates = getMouseCoordinates(e);
  DragDropActionCreators.drag(coordinates);
}

function handleTopMouseUp() {
  var type = DragDropStore.getDraggedItemType();
  _currentComponent.handleDragEnd(type, null);
}

var MouseMoveBackend = {
  setup() {
  },

  teardown() {
  },

  beginDrag(component, e, containerNode, dragPreview, dragAnchors, dragStartOffset, effectsAllowed) {
    _currentComponent = component;
    window.addEventListener('mousemove', handleTopMouseMove);
    window.addEventListener('mouseup', handleTopMouseUp);
  },

  endDrag() {
    _currentComponent = null;
    window.removeEventListener('mousemove', handleTopMouseMove);
    window.removeEventListener('mouseup', handleTopMouseUp);
  },

  dragOver(e, dropEffect) {
  },

  getDragSourceProps(component, type) {
    // TODO: optimize bind when we figure this out
    return {
      onMouseDown: component.handleDragStart.bind(component, type)
    };
  },

  getDropTargetProps(component, types) {
    return {
      onMouseEnter: component.handleDragEnter.bind(component, types),
      onMouseOver: component.handleDragOver.bind(component, types),
      onMouseLeave: component.handleDragLeave.bind(component, types),
      onMouseUp: component.handleDrop.bind(component, types)
    };
  }
};

module.exports = MouseMoveBackend;
