"use strict";

var keyMirror = require("react/lib/keyMirror");

var DragDropActionTypes = keyMirror({
  DRAG_START: null,
  DRAG_END: null,
  DROP: null,
  RECORD_DROP_TARGET: null
});

module.exports = DragDropActionTypes;