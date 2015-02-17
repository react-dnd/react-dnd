"use strict";

var DragDropDispatcher = require("../dispatcher/DragDropDispatcher"),
    DragDropActionTypes = require("../constants/DragDropActionTypes");

var DragDropActionCreators = {
  startDragging: function startDragging(itemType, item, effectsAllowed, offsetFromClient, offsetFromContainer) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG_START,
      itemType: itemType,
      item: item,
      effectsAllowed: effectsAllowed,
      offsetFromClient: offsetFromClient,
      offsetFromContainer: offsetFromContainer
    });
  },

  drag: function drag(offsetFromClient) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG,
      offsetFromClient: offsetFromClient
    });
  },

  recordDrop: function recordDrop(dropEffect) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DROP,
      dropEffect: dropEffect
    });
  },

  endDragging: function endDragging() {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG_END
    });
  }
};

module.exports = DragDropActionCreators;