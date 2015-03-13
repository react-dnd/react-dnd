"use strict";

var DragOffsetStore = require("../stores/DragOffsetStore");

var DragDropContext = {
  getCurrentOffsetDelta: function getCurrentOffsetDelta() {
    var initialOffset = DragOffsetStore.getInitialOffsetFromClient(),
        currentOffset = DragOffsetStore.getCurrentOffsetFromClient();

    return {
      x: currentOffset.x - initialOffset.x,
      y: currentOffset.y - initialOffset.y
    };
  },

  getInitialOffsetFromClient: function getInitialOffsetFromClient() {
    return DragOffsetStore.getInitialOffsetFromClient();
  },

  getCurrentOffsetFromClient: function getCurrentOffsetFromClient() {
    return DragOffsetStore.getCurrentOffsetFromClient();
  },

  getInitialOffsetFromContainer: function getInitialOffsetFromContainer() {
    return DragOffsetStore.getInitialOffsetFromContainer();
  }
};

module.exports = DragDropContext;