'use strict';

var HorizontalDragAnchors = require('../constants/HorizontalDragAnchors'),
    VerticalDragAnchors = require('../constants/VerticalDragAnchors'),
    isFirefox = require('./isFirefox'),
    isSafari = require('./isSafari');

/**
 * Returns offset to be used as arguments for `dataTransfer.setDragImage(dragImage, x, y)`.
 * Attempts to work around browser differences, especially on high-DPI screens.
 */
function getDragImageOffset(containerNode, dragPreview, dragAnchors, e) {
  dragAnchors = dragAnchors || {};

  var containerWidth = containerNode.offsetWidth,
      containerHeight = containerNode.offsetHeight,
      isImage = dragPreview instanceof Image,
      previewWidth = isImage ? dragPreview.width : containerWidth,
      previewHeight = isImage ? dragPreview.height : containerHeight,
      horizontalAnchor = dragAnchors.horizontal || HorizontalDragAnchors.CENTER,
      verticalAnchor = dragAnchors.vertical || VerticalDragAnchors.CENTER,
      { offsetX, offsetY } = e;

  // Work around @2x coordinate discrepancies in browsers
  if (isFirefox()) {
    offsetX = e.layerX;
    offsetY = e.layerY;
  } else if (isSafari()) {
    previewHeight /= window.devicePixelRatio;
    previewWidth /= window.devicePixelRatio;
  }

  switch (horizontalAnchor) {
  case HorizontalDragAnchors.LEFT:
    break;
  case HorizontalDragAnchors.CENTER:
    offsetX *= (previewWidth / containerWidth);
    break;
  case HorizontalDragAnchors.RIGHT:
    offsetX = previewWidth - previewWidth * (1 - offsetX / containerWidth);
    break;
  }

  switch (verticalAnchor) {
  case VerticalDragAnchors.TOP:
    break;
  case VerticalDragAnchors.CENTER:
    offsetY *= (previewHeight / containerHeight);
    break;
  case VerticalDragAnchors.BOTTOM:
    offsetY = previewHeight - previewHeight * (1 - offsetY / containerHeight);
    break;
  }

  // Work around Safari 8 positioning bug
  if (isSafari()) {
    // We'll have to wait for @3x to see if this is entirely correct
    offsetY += (window.devicePixelRatio - 1) * previewHeight;
  }

  return {
    x: offsetX,
    y: offsetY
  };
}

module.exports = getDragImageOffset;