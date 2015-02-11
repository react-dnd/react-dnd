"use strict";

function isFileDragDropEvent(e) {
  var types = Array.prototype.slice.call(e.dataTransfer.types);
  return types.indexOf("Files") !== -1;
}

module.exports = isFileDragDropEvent;