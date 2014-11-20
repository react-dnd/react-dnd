'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes');

var DragDropActionCreators = {
  startDragging(itemType, item, effectsAllowed, dragOffset, dragStartOffset) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG_START,
      itemType: itemType,
      item: item,
      effectsAllowed: effectsAllowed,
      dragOffset: dragOffset,
      dragStartOffset: dragStartOffset
    });
  },

  drag(dragOffset) {
    DragDropDispatcher.handleAction({
      type: DragDropActionTypes.DRAG,
      dragOffset: dragOffset
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