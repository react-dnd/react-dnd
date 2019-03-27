"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BrowserDetector_1 = require("./BrowserDetector");
var MonotonicInterpolant_1 = require("./MonotonicInterpolant");
var ELEMENT_NODE = 1;
function getNodeClientOffset(node) {
    var el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;
    if (!el) {
        return null;
    }
    var _a = el.getBoundingClientRect(), top = _a.top, left = _a.left;
    return { x: left, y: top };
}
exports.getNodeClientOffset = getNodeClientOffset;
function getEventClientOffset(e) {
    return {
        x: e.clientX,
        y: e.clientY,
    };
}
exports.getEventClientOffset = getEventClientOffset;
function isImageNode(node) {
    return (node.nodeName === 'IMG' &&
        (BrowserDetector_1.isFirefox() || !document.documentElement.contains(node)));
}
function getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight) {
    var dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
    var dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;
    // Work around @2x coordinate discrepancies in browsers
    if (BrowserDetector_1.isSafari() && isImage) {
        dragPreviewHeight /= window.devicePixelRatio;
        dragPreviewWidth /= window.devicePixelRatio;
    }
    return { dragPreviewWidth: dragPreviewWidth, dragPreviewHeight: dragPreviewHeight };
}
function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint) {
    // The browsers will use the image intrinsic size under different conditions.
    // Firefox only cares if it's an image, but WebKit also wants it to be detached.
    var isImage = isImageNode(dragPreview);
    var dragPreviewNode = isImage ? sourceNode : dragPreview;
    var dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
    var offsetFromDragPreview = {
        x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
        y: clientOffset.y - dragPreviewNodeOffsetFromClient.y,
    };
    var sourceWidth = sourceNode.offsetWidth, sourceHeight = sourceNode.offsetHeight;
    var anchorX = anchorPoint.anchorX, anchorY = anchorPoint.anchorY;
    var _a = getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight), dragPreviewWidth = _a.dragPreviewWidth, dragPreviewHeight = _a.dragPreviewHeight;
    var calculateYOffset = function () {
        var interpolantY = new MonotonicInterpolant_1.default([0, 0.5, 1], [
            // Dock to the top
            offsetFromDragPreview.y,
            // Align at the center
            (offsetFromDragPreview.y / sourceHeight) * dragPreviewHeight,
            // Dock to the bottom
            offsetFromDragPreview.y + dragPreviewHeight - sourceHeight,
        ]);
        var y = interpolantY.interpolate(anchorY);
        // Work around Safari 8 positioning bug
        if (BrowserDetector_1.isSafari() && isImage) {
            // We'll have to wait for @3x to see if this is entirely correct
            y += (window.devicePixelRatio - 1) * dragPreviewHeight;
        }
        return y;
    };
    var calculateXOffset = function () {
        // Interpolate coordinates depending on anchor point
        // If you know a simpler way to do this, let me know
        var interpolantX = new MonotonicInterpolant_1.default([0, 0.5, 1], [
            // Dock to the left
            offsetFromDragPreview.x,
            // Align at the center
            (offsetFromDragPreview.x / sourceWidth) * dragPreviewWidth,
            // Dock to the right
            offsetFromDragPreview.x + dragPreviewWidth - sourceWidth,
        ]);
        return interpolantX.interpolate(anchorX);
    };
    // Force offsets if specified in the options.
    var offsetX = offsetPoint.offsetX, offsetY = offsetPoint.offsetY;
    var isManualOffsetX = offsetX === 0 || offsetX;
    var isManualOffsetY = offsetY === 0 || offsetY;
    return {
        x: isManualOffsetX ? offsetX : calculateXOffset(),
        y: isManualOffsetY ? offsetY : calculateYOffset(),
    };
}
exports.getDragPreviewOffset = getDragPreviewOffset;
