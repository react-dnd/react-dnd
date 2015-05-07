"use strict";

exports.Pages = {
  HOME: {
    location: 'index.html',
    title: 'Home'
  },
  EXAMPLES: {
    location: 'examples.html',
    title: 'Examples'
  }
};

exports.APIPages = {
  DRAG_SOURCE: {
    location: 'api-drag-source.html',
    title: 'Drag Source API'
  },
  DROP_TARGET: {
    location: 'api-drop-target.html',
    title: 'Drop Target API'
  },
  CONFIGURE_DRAG_DROP: {
    location: 'api-configure-drag-drop.html',
    title: 'configureDragDrop'
  },
  CONFIGURE_DRAG_DROP_LAYER: {
    location: 'api-configure-drag-drop-layer.html',
    title: 'configureDragDropLayer'
  },
  CONFIGURE_DRAG_DROP_CONTEXT: {
    location: 'api-configure-drag-drop-context.html',
    title: 'configureDragDropContext'
  },
  DRAG_SOURCE_MONITOR: {
    location: 'api-drag-source-monitor.html',
    title: 'DragSourceMonitor'
  },
  DROP_TARGET_MONITOR: {
    location: 'api-drop-target-monitor.html',
    title: 'DropTargetMonitor'
  },
  DRAG_DROP_MONITOR: {
    location: 'api-drag-drop-monitor.html',
    title: 'DragDropMonitor'
  },
  HTML5: {
    location: 'api-html5.html',
    title: 'HTML5'
  }
};

exports.DOCS_DEFAULT = exports.APIPages.CONFIGURE_DRAG_DROP;
