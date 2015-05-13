export const Pages = {
  HOME: {
    location: 'index.html',
    title: 'Home'
  },
  EXAMPLES: {
    location: 'examples.html',
    title: 'Examples'
  }
};

export const APIPages = [{
  title: 'Top-Level API',
  pages: {
    DRAG_SOURCE: {
      location: 'api-drag-source.html',
      title: 'DragSource'
    },
    DROP_TARGET: {
      location: 'api-drop-target.html',
      title: 'DropTarget'
    },
    DRAG_LAYER: {
      location: 'api-drag-layer.html',
      title: 'DragLayer'
    },
    DRAG_DROP_CONTEXT: {
      location: 'api-drag-drop-context.html',
      title: 'DragDropContext'
    }
  }
}, {
  title: 'Monitoring State',
  pages: {
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
    }
  }
}, {
  title: 'Connecting to DOM',
  pages: {
    DRAG_SOURCE_CONNECTOR: {
      location: 'api-drag-source-connector.html',
      title: 'DragSourceConnector'
    },
    DROP_TARGET_CONNECTOR: {
      location: 'api-drop-target-connector.html',
      title: 'DropTargetConnector'
    }
  }
}, {
  title: 'Backends',
  pages: {
    HTML5: {
      location: 'api-html5.html',
      title: 'HTML5'
    }
  }
}];

export const DOCS_DEFAULT = APIPages[0].pages.DRAG_SOURCE;
