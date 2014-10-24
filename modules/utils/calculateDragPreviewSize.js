'use strict';

var isFirefox = require('./isFirefox'),
    isSafari = require('./isSafari');

function calculateDragPreviewSize(desiredSize) {
  var size = {
    width: desiredSize.width,
    height: desiredSize.height
  };

  if (isFirefox() || isSafari()) {
    size.width *= window.devicePixelRatio;
    size.height *= window.devicePixelRatio;
  }

  return size;
}

module.exports = calculateDragPreviewSize;