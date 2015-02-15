'use strict';

var keyMirror = require('react/lib/keyMirror');

var DragDropActionTypes = keyMirror({
  DRAG_START: null,
  DRAG_END: null,
  DROP: null,
  CAPTURE_DROP_TARGET: null,
  RELEASE_DROP_TARGET: null
});

module.exports = DragDropActionTypes;