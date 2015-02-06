'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators'),
    DragDropStore = require('../stores/DragDropStore');

var _currentComponent;

function handleTopMouseMove(e) {
  var type = DragDropStore.getDraggedItemType();
  _currentComponent.handleDrag(type, e);
}

function handleTopMouseUp() {
  var type = DragDropStore.getDraggedItemType();
  _currentComponent.handleDragEnd(type, null);
}

var MouseMoveBackend = {
  setup() {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('mousemove', handleTopMouseMove);
    window.addEventListener('mouseup', handleTopMouseUp);
  },

  teardown() {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('mousemove', handleTopMouseMove);
    window.addEventListener('mouseup', handleTopMouseUp);
  },

  beginDrag(component, e, containerNode, dragPreview, dragAnchors, dragStartOffset, effectsAllowed) {
    _currentComponent = component;
  },

  endDrag() {
    _currentComponent = null;
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
    // TODO
    return {};
  }
};

module.exports = MouseMoveBackend;
