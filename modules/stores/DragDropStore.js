'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes'),
    createStore = require('../utils/createStore');

var _draggedItem = null,
    _draggedItemType = null,
    _effectsAllowed = null,
    _dropEffect = null,
    _dropTargets = [];

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
    return _dropTargets[_dropTargets.length - 1] || null;
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
    _dropTargets = [];
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.DRAG_END:
    _draggedItem = null;
    _draggedItemType = null;
    _effectsAllowed = null;
    _dropEffect = null;
    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.CAPTURE_DROP_TARGET:
    if (_dropTargets.indexOf(action.component) === -1) {
      _dropTargets.push(action.component);
    }

    DragDropStore.emitChange();
    break;

  case DragDropActionTypes.RELEASE_DROP_TARGET:
    var index = _dropTargets.indexOf(action.component);

    if (index > -1) {
      _dropTargets.splice(index, 1);
    }

    DragDropStore.emitChange();
    break;
  }
});

module.exports = DragDropStore;