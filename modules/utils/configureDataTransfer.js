'use strict';

var shouldUseDragPreview = require('./shouldUseDragPreview'),
    getDragImageOffset = require('./getDragImageOffset');

function configureDataTransfer(containerNode, nativeEvent, dragOptions) {
  var { dataTransfer } = nativeEvent,
      { dragPreview, effectAllowed, dragAnchors } = dragOptions;

  try {
    // Firefox won't drag without setting data
    dataTransfer.setData('application/json', {});
  } catch (err) {
    // IE doesn't support MIME types in setData
  }

  if (shouldUseDragPreview(dragPreview) && dataTransfer.setDragImage) {
    var dragOffset = getDragImageOffset(containerNode, dragPreview, dragAnchors, nativeEvent);
    dataTransfer.setDragImage(dragPreview, dragOffset.x, dragOffset.y);
  }

  dataTransfer.effectAllowed = effectAllowed;
}

module.exports = configureDataTransfer;