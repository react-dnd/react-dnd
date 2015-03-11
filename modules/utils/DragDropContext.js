'use strict';

var DragOffsetStore = require('../stores/DragOffsetStore');

var DragDropContext = {
  getCurrentOffsetDelta() {
    var initialOffset = DragOffsetStore.getInitialOffsetFromClient(),
        currentOffset = DragOffsetStore.getCurrentOffsetFromClient();

    return {
      x: currentOffset.x - initialOffset.x,
      y: currentOffset.y - initialOffset.y
    };
  },

  getInitialOffsetFromClient() {
    return DragOffsetStore.getInitialOffsetFromClient();
  },

  getCurrentOffsetFromClient() {
    return DragOffsetStore.getCurrentOffsetFromClient();
  },

  getInitialOffsetFromContainer() {
    return DragOffsetStore.getInitialOffsetFromContainer();
  }
};

module.exports = DragDropContext;
