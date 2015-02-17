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
  }
};

module.exports = DragDropContext;