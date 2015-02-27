'use strict';

var isFileDragDropEvent = require('./isFileDragDropEvent'),
    isUrlDragDropEvent = require('./isUrlDragDropEvent');

function extractNativeItem(e) {
  if (isFileDragDropEvent(e)) {
    return {
      files: Array.prototype.slice.call(e.dataTransfer.files)
    };
  } else if (isUrlDragDropEvent(e)) {
    return {
      urls: (
        e.dataTransfer.getData('Url') ||
        e.dataTransfer.getData('text/uri-list') || ''
      ).split('\n')
    };
  }
}

module.exports = extractNativeItem;