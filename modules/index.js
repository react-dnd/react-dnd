'use strict';

var backends = require('./backends'),
    createDragDropMixin = require('./utils/createDragDropMixin');

module.exports = {
  createDragDropMixin: createDragDropMixin,
  DragDropMixin: createDragDropMixin(backends.HTML5),
  MouseDragDropMixin: createDragDropMixin(backends.Mouse),
  TouchDragDropMixin: createDragDropMixin(backends.Touch),
  HorizontalDragAnchors: require('./constants/HorizontalDragAnchors'),
  VerticalDragAnchors: require('./constants/VerticalDragAnchors'),
  NativeDragItemTypes: require('./constants/NativeDragItemTypes'),
  DropEffects: require('./constants/DropEffects'),
  DragFeedbackMixin: require('./mixins/DragFeedbackMixin'),
  ImagePreloaderMixin: require('./mixins/ImagePreloaderMixin'),
  DragDropStore: require('./stores/DragDropStore')
};
