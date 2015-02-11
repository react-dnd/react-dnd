"use strict";

var isSafari = require("./isSafari"),
    endsWith = require("./endsWith");

function shouldUseDragPreview(dragPreview) {
  if (!dragPreview) {
    return false;
  }

  if (isSafari() && dragPreview instanceof Image && endsWith(dragPreview.src, ".gif")) {
    // GIFs crash Safari
    return false;
  }

  return true;
}

module.exports = shouldUseDragPreview;