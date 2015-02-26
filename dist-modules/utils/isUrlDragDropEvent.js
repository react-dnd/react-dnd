"use strict";

function isUrlDragDropEvent(e) {
  var types = Array.prototype.slice.call(e.dataTransfer.types);
  return types.indexOf("text/uri-list") !== -1;
}

module.exports = isUrlDragDropEvent;