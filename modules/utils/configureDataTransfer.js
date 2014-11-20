'use strict';

var shouldUseDragPreview = require('./shouldUseDragPreview'),
    getDragImageOffset = require('./getDragImageOffset'),
    getBrowserEffectAllowed = require('./getBrowserEffectAllowed');

function configureDataTransfer(containerNode, dataTransfer, dragPreview, dragAnchors, dragStartOffset, effectsAllowed) {
  try {
    // Firefox won't drag without setting data
    dataTransfer.setData('application/json', {});
  } catch (err) {
    // IE doesn't support MIME types in setData
  }

  if (shouldUseDragPreview(dragPreview) && dataTransfer.setDragImage) {
    var dragOffset = getDragImageOffset(containerNode, dragPreview, dragAnchors, dragStartOffset);
    dataTransfer.setDragImage(dragPreview, dragOffset.x, dragOffset.y);
  }

  dataTransfer.effectAllowed = getBrowserEffectAllowed(effectsAllowed);
}

module.exports = configureDataTransfer;