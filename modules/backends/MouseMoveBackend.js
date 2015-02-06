'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators');

var MouseMoveBackend = {
  setup() {
    if (typeof window !== 'undefined') {
    }
  },

  teardown() {
    if (typeof window !== 'undefined') {
    }
  },

  beginDrag(e, containerNode, dragPreview, dragAnchors, dragStartOffset, effectsAllowed, imitateDragEnd) {
  },

  endDrag() {
  },

  dragOver(e, dropEffect) {
  },

  getDragSourceProps(component, type) {
    // TODO: optimize bind when we figure this out
    return {
      onMouseDown: component.handleDragStart.bind(component, type),
      onMouseMove: component.handleDrag.bind(component, type),
      onMouseUp: component.handleDragEnd.bind(component, type)
    };
  },

  getDropTargetProps(component, types) {
    // TODO
    return {};
  }
};

module.exports = MouseMoveBackend;
