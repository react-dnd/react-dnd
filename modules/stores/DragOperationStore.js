'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes'),
    DragOffsetStore = require('../stores/DragOffsetStore'),
    createStore = require('../utils/createStore');

var _draggedItem = null,
    _draggedItemType = null,
    _effectsAllowed = null,
    _dropEffect = null;

var DragOperationStore = createStore({
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

  getDraggedItemType() {
    return _draggedItemType;
  }
});

DragOperationStore.dispatchToken = DragDropDispatcher.register(function (payload) {
  DragDropDispatcher.waitFor([DragOffsetStore.dispatchToken]);

  var { action } = payload;

  switch (action.type) {
  case DragDropActionTypes.DRAG_START:
    _dropEffect = null;
    _draggedItem = action.item;
    _draggedItemType = action.itemType;
    _effectsAllowed = action.effectsAllowed;
    DragOperationStore.emitChange();
    break;

  case DragDropActionTypes.DROP:
    _dropEffect = action.dropEffect;
    DragOperationStore.emitChange();
    break;

  case DragDropActionTypes.DRAG_END:
    _draggedItem = null;
    _draggedItemType = null;
    _effectsAllowed = null;
    _dropEffect = null;
    DragOperationStore.emitChange();
    break;
  }
});

module.exports = DragOperationStore;