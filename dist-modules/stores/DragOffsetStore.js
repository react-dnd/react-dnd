"use strict";

var DragDropDispatcher = require("../dispatcher/DragDropDispatcher"),
    DragDropActionTypes = require("../constants/DragDropActionTypes"),
    createStore = require("../utils/createStore");

var _initialOffsetFromContainer = null,
    _initialOffsetFromClient = null,
    _currentOffsetFromClient = null;

var DragOffsetStore = createStore({
  getInitialOffsetFromContainer: function getInitialOffsetFromContainer() {
    return _initialOffsetFromContainer;
  },

  getInitialOffsetFromClient: function getInitialOffsetFromClient() {
    return _initialOffsetFromClient;
  },

  getCurrentOffsetFromClient: function getCurrentOffsetFromClient() {
    return _currentOffsetFromClient;
  }
});

DragOffsetStore.dispatchToken = DragDropDispatcher.register(function (payload) {
  var action = payload.action;


  switch (action.type) {
    case DragDropActionTypes.DRAG_START:
      _initialOffsetFromContainer = action.offsetFromContainer;
      _initialOffsetFromClient = action.offsetFromClient;
      _currentOffsetFromClient = action.offsetFromClient;
      DragOffsetStore.emitChange();
      break;

    case DragDropActionTypes.DRAG:
      _currentOffsetFromClient = action.offsetFromClient;
      DragOffsetStore.emitChange();
      break;

    case DragDropActionTypes.DRAG_END:
      _initialOffsetFromContainer = null;
      _initialOffsetFromClient = null;
      _currentOffsetFromClient = null;
      DragOffsetStore.emitChange();
  }
});

module.exports = DragOffsetStore;