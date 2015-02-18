'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes');

var DragDropActionCreators = {
  startDragging(itemType, item, effectsAllowed, offsetFromClient, offsetFromContainer) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG_START,
      itemType: itemType,
      item: item,
      effectsAllowed: effectsAllowed,
      offsetFromClient: offsetFromClient,
      offsetFromContainer: offsetFromContainer
    });
  },

  drag(offsetFromClient) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG,
      offsetFromClient: offsetFromClient
    });
  },

  recordDrop(dropEffect) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DROP,
      dropEffect: dropEffect
    });
  },

  endDragging() {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG_END
    });
  },

  captureDropTarget(component) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.CAPTURE_DROP_TARGET,
      component: component
    });
  },

  releaseDropTarget(component) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.RELEASE_DROP_TARGET,
       component: component
    });
  }
};

module.exports = DragDropActionCreators;