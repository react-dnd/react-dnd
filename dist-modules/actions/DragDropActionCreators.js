"use strict";

var DragDropDispatcher = require("../dispatcher/DragDropDispatcher"),
    DragDropActionTypes = require("../constants/DragDropActionTypes");

var DragDropActionCreators = {
  startDragging: function startDragging(itemType, item, effectsAllowed) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG_START,
      itemType: itemType,
      item: item,
      effectsAllowed: effectsAllowed
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