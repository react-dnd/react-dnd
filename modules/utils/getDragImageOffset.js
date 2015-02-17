'use strict';

var HorizontalDragAnchors = require('../constants/HorizontalDragAnchors'),
    VerticalDragAnchors = require('../constants/VerticalDragAnchors'),
    isSafari = require('./isSafari');

/**
 * Returns offset to be used as arguments for `dataTransfer.setDragImage(dragImage, x, y)`.
 * Attempts to work around browser differences, especially on high-DPI screens.
 */
function getDragImageOffset(containerNode, dragPreview, dragAnchors, offsetFromContainer) {
  dragAnchors = dragAnchors || {};

  var containerWidth = containerNode.offsetWidth,
      containerHeight = containerNode.offsetHeight,
      isImage = dragPreview instanceof Image,
      previewWidth = isImage ? dragPreview.width : containerWidth,
      previewHeight = isImage ? dragPreview.height : containerHeight,
      horizontalAnchor = dragAnchors.horizontal || HorizontalDragAnchors.CENTER,
      verticalAnchor = dragAnchors.vertical || VerticalDragAnchors.CENTER,
      { x, y } = offsetFromContainer;

  // Work around @2x coordinate discrepancies in browsers
  if (isSafari()) {
    previewHeight /= window.devicePixelRatio;
    previewWidth /= window.devicePixelRatio;
  }

  switch (horizontalAnchor) {
  case HorizontalDragAnchors.LEFT:
    break;
  case HorizontalDragAnchors.CENTER:
    x *= (previewWidth / containerWidth);
    break;
  case HorizontalDragAnchors.RIGHT:
    x = previewWidth - previewWidth * (1 - x / containerWidth);
    break;
  }

  switch (verticalAnchor) {
  case VerticalDragAnchors.TOP:
    break;
  case VerticalDragAnchors.CENTER:
    y *= (previewHeight / containerHeight);
    break;
  case VerticalDragAnchors.BOTTOM:
    y = previewHeight - previewHeight * (1 - y / containerHeight);
    break;
  }

  // Work around Safari 8 positioning bug
  if (isSafari()) {
    // We'll have to wait for @3x to see if this is entirely correct
    y += (window.devicePixelRatio - 1) * previewHeight;
  }

  return {
    x: x,
    y: y
  };
}

module.exports = getDragImageOffset;