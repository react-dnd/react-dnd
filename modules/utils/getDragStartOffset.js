'use strict';

function getDragStartOffset(containerNode, e) {
  var containerRect = containerNode.getBoundingClientRect();

  return {
    x: e.clientX - containerRect.left,
    y: e.clientY - containerRect.top
  };
}

module.exports = getDragStartOffset;