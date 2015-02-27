'use strict';

var DragDropDispatcher = require('../dispatcher/DragDropDispatcher'),
    DragDropActionTypes = require('../constants/DragDropActionTypes'),
    DragOffsetStore = require('../stores/DragOffsetStore'),
    createStore = require('../utils/createStore');

var _draggedItem = null,
    _draggedItemType = null,
    _effectsAllowed = null,
    _dropEffect = null,
    _dropTargets = [];

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
  },

  getActiveDropTarget() {
    return _dropTargets[_dropTargets.length - 1] || null;
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
    _dropTargets = [];
    DragOperationStore.emitChange();
    break;

  case DragDropActionTypes.DRAG_END:
    _draggedItem = null;
    _draggedItemType = null;
    _effectsAllowed = null;
    _dropEffect = null;
    DragOperationStore.emitChange();
    break;

  case DragDropActionTypes.CAPTURE_DROP_TARGET:
    if (_dropTargets.indexOf(action.component) === -1) {
      _dropTargets.push(action.component);
    }

    DragOperationStore.emitChange();
    break;

  case DragDropActionTypes.RELEASE_DROP_TARGET:
    var index = _dropTargets.indexOf(action.component);

    if (index > -1) {
      _dropTargets.splice(index, 1);
    }

    DragOperationStore.emitChange();
    break;
  }
});

module.exports = DragOperationStore;