'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes');

var DragDropActionCreators = {
  startDragging(itemKey, itemType, item, effectsAllowed) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG_START,
      itemKey: itemKey,
      itemType: itemType,
      item: item,
      effectsAllowed: effectsAllowed
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
  }
};

module.exports = DragDropActionCreators;
