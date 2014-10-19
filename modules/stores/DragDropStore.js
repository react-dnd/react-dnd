'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes'),
    createStore = require('../utils/createStore');

var _draggedItem = null,
    _draggedItemType = null,
    _didDrop = false;

var DragDropStore = createStore({
  isDragging() {
    return !!_draggedItem;
  },

  didDrop() {
    return _didDrop;
  },

  getDraggedItem() {
    return _draggedItem;
  },

  getDraggedItemType() {
    return _draggedItemType;
  }
});

DragDropDispatcher.register(function (payload) {
  var { action } = payload;

  switch (action.type) {
  case DragDropActionTypes.DRAG_START:
    _didDrop = false;
    _draggedItem = action.item;
    _draggedItemType = action.itemType;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DROP:
    _didDrop = true;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DRAG_END:
    _didDrop = false;
    _draggedItem = null;
    _draggedItemType = null;
    DragDropStore.emitChange();
    break;
  }
});

module.exports = DragDropStore;