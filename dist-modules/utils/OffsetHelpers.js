'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

exports.__esModule = true;
exports.getElementClientOffset = getElementClientOffset;
exports.getEventClientOffset = getEventClientOffset;
exports.getDragPreviewOffset = getDragPreviewOffset;

var _isSafari$isFirefox = require('./BrowserDetector');

var _createMonotonicInterpolant = require('./createMonotonicInterpolant');

var _createMonotonicInterpolant2 = _interopRequireWildcard(_createMonotonicInterpolant);

var ELEMENT_NODE = 1;

function getElementClientOffset(el) {
  if (el.nodeType !== ELEMENT_NODE) {
    el = el.parentElement;
  }

  if (!el) {
    return null;
  }

  var _el$getBoundingClientRect = el.getBoundingClientRect();

  var top = _el$getBoundingClientRect.top;
  var left = _el$getBoundingClientRect.left;

  return { x: left, y: top };
}

function getEventClientOffset(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
}

function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint) {
  var dragPreviewOffsetFromClient = getElementClientOffset(dragPreview);
  var offsetFromDragPreview = {
    x: clientOffset.x - dragPreviewOffsetFromClient.x,
    y: clientOffset.y - dragPreviewOffsetFromClient.y
  };

  var sourceWidth = sourceNode.offsetWidth;
  var sourceHeight = sourceNode.offsetHeight;
  var anchorX = anchorPoint.anchorX;
  var anchorY = anchorPoint.anchorY;

  var isImage = dragPreview instanceof Image;

  var dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
  var dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;

  // Work around @2x coordinate discrepancies in browsers
  if (_isSafari$isFirefox.isSafari() && isImage) {
    dragPreviewHeight /= window.devicePixelRatio;
    dragPreviewWidth /= window.devicePixelRatio;
  } else if (_isSafari$isFirefox.isFirefox() && !isImage) {
    dragPreviewHeight *= window.devicePixelRatio;
    dragPreviewWidth *= window.devicePixelRatio;
  }

  // Interpolate coordinates depending on anchor point
  // If you know a simpler way to do this, let me know
  var interpolateX = _createMonotonicInterpolant2['default']([0, 0.5, 1], [
  // Dock to the left
  offsetFromDragPreview.x,
  // Align at the center
  offsetFromDragPreview.x / sourceWidth * dragPreviewWidth,
  // Dock to the right
  offsetFromDragPreview.x + dragPreviewWidth - sourceWidth]);
  var interpolateY = _createMonotonicInterpolant2['default']([0, 0.5, 1], [
  // Dock to the top
  offsetFromDragPreview.y,
  // Align at the center
  offsetFromDragPreview.y / sourceHeight * dragPreviewHeight,
  // Dock to the right
  offsetFromDragPreview.y + dragPreviewHeight - sourceHeight]);
  var x = interpolateX(anchorX);
  var y = interpolateY(anchorY);

  // Work around Safari 8 positioning bug
  if (_isSafari$isFirefox.isSafari() && isImage) {
    // We'll have to wait for @3x to see if this is entirely correct
    y += (window.devicePixelRatio - 1) * dragPreviewHeight;
  }

  return { x: x, y: y };
}