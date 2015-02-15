'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes'),
    createStore = require('../utils/createStore');

var _draggedItem = null,
    _draggedItemType = null,
    _effectsAllowed = null,
    _dropEffect = null,
    _activeDropTarget;

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

  getDraggedItemType() {
    return _draggedItemType;
  },

  getActiveDropTarget() {
    return _activeDropTarget;
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
    _activeDropTarget = null;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DRAG_END:
    _draggedItem = null;
    _draggedItemType = null;
    _effectsAllowed = null;
    _dropEffect = null;
    _activeDropTarget = null;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.RECORD_DROP_TARGET:
    _activeDropTarget = action.component;
    DragDropStore.emitChange();
    break;
  }
});

module.exports = DragDropStore;