import { isSafari, isFirefox } from './BrowserDetector';
import createMonotonicInterpolant from './createMonotonicInterpolant';

const ELEMENT_NODE = 1;

export function getElementClientOffset(el) {
  if (el.nodeType !== ELEMENT_NODE) {
    el = el.parentElement;
  }

  if (!el) {
    return null;
  }

  const { top, left } = el.getBoundingClientRect();
  return { x: left, y: top };
}

export function getEventClientOffset(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
}

export function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint) {
  const dragPreviewOffsetFromClient = getElementClientOffset(dragPreview);
  const offsetFromDragPreview = {
    x: clientOffset.x - dragPreviewOffsetFromClient.x,
    y: clientOffset.y - dragPreviewOffsetFromClient.y
  };

  const { offsetWidth: sourceWidth, offsetHeight: sourceHeight } = sourceNode;
  const { anchorX, anchorY } = anchorPoint;
  const isImage = dragPreview instanceof Image;

  let dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
  let dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;

  // Work around @2x coordinate discrepancies in browsers
  if (isSafari() && isImage) {
    dragPreviewHeight /= window.devicePixelRatio;
    dragPreviewWidth /= window.devicePixelRatio;
  } else if (isFirefox() && !isImage) {
    dragPreviewHeight *= window.devicePixelRatio;
    dragPreviewWidth *= window.devicePixelRatio;
  }

  // Interpolate coordinates depending on anchor point
  // If you know a simpler way to do this, let me know
  var interpolateX = createMonotonicInterpolant([0, 0.5, 1], [
    // Dock to the left
    offsetFromDragPreview.x,
    // Align at the center
    (offsetFromDragPreview.x / sourceWidth) * dragPreviewWidth,
    // Dock to the right
    offsetFromDragPreview.x + dragPreviewWidth - sourceWidth
  ]);
  var interpolateY = createMonotonicInterpolant([0, 0.5, 1], [
    // Dock to the top
    offsetFromDragPreview.y,
    // Align at the center
    (offsetFromDragPreview.y / sourceHeight) * dragPreviewHeight,
    // Dock to the right
    offsetFromDragPreview.y + dragPreviewHeight - sourceHeight
  ]);
  let x = interpolateX(anchorX);
  let y = interpolateY(anchorY);

  // Work around Safari 8 positioning bug
  if (isSafari() && isImage) {
    // We'll have to wait for @3x to see if this is entirely correct
    y += (window.devicePixelRatio - 1) * dragPreviewHeight;
  }

  return { x, y };
}