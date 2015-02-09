'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes'),
    createStore = require('../utils/createStore');

var _draggedItem = null,
    _draggedItemType = null,
    _lastDraggedItem = null,
    _lastDraggedItemType = null,
    _effectsAllowed = null,
    _dropEffect = null;

var DragDropStore = createStore({
  isDragging() {
    return !!_draggedItem;
  },

  getEffectsAllowed() {
    return _effectsAllowed;
  },

  getDropEffect() {
    return _dropEffect;
  },

  getDraggedItem() {
    return _draggedItem;
  },

  getLastDraggedItem() {
    return _lastDraggedItem;
  },

  getLastDraggedItemType() {
    return _lastDraggedItemType;
  },

  getDraggedItemType() {
    return _draggedItemType;
  }
});

DragDropDispatcher.register(function (payload) {
  var { action } = payload;

  switch (action.type) {
  case DragDropActionTypes.DRAG_START:
    _dropEffect = null;
    _draggedItem = action.item;
    _draggedItemType = action.itemType;
    _effectsAllowed = action.effectsAllowed;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DROP:
    _dropEffect = action.dropEffect;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DRAG_END:
    _lastDraggedItem = _draggedItem;
    _lastDraggedItemType = _draggedItemType;
    _draggedItem = null;
    _draggedItemType = null;
    _effectsAllowed = null;
    _dropEffect = null;
    DragDropStore.emitChange();
    break;
  }
});

module.exports = DragDropStore;