'use strict';

var DragDropActionCreators = require('../actions/DragDropActionCreators');

var mousemove = {
  setup() {
    if (typeof window !== 'undefined') {
    }
  },

  teardown() {
    if (typeof window !== 'undefined') {
    }
  },

  beginDrag(dragTarget, imitateDragEnd) {
  },

  endDrag() {
  },

  dragOver(e, dropEffect) {
  }
};

module.exports = mousemove;
