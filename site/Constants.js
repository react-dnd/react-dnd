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
  title: 'Quick Start',
  pages: {
    OVERVIEW: {
      location: 'docs-overview.html',
      title: 'Overview'
    },
    TUTORIAL: {
      location: 'docs-tutorial.html',
      title: 'Tutorial'
    }
  }
}, {
  title: 'Top-Level API',
  pages: {
    DRAG_SOURCE: {
      location: 'docs-drag-source.html',
      title: 'DragSource'
    },
    DROP_TARGET: {
      location: 'docs-drop-target.html',
      title: 'DropTarget'
    },
    DRAG_LAYER: {
      location: 'docs-drag-layer.html',
      title: 'DragLayer'
    },
    DRAG_DROP_CONTEXT: {
      location: 'docs-drag-drop-context.html',
      title: 'DragDropContext'
    }
  }
}, {
  title: 'Connecting to DOM',
  pages: {
    DRAG_SOURCE_CONNECTOR: {
      location: 'docs-drag-source-connector.html',
      title: 'DragSourceConnector'
    },
    DROP_TARGET_CONNECTOR: {
      location: 'docs-drop-target-connector.html',
      title: 'DropTargetConnector'
    }
  }
}, {
  title: 'Monitoring State',
  pages: {
    DRAG_SOURCE_MONITOR: {
      location: 'docs-drag-source-monitor.html',
      title: 'DragSourceMonitor'
    },
    DROP_TARGET_MONITOR: {
      location: 'docs-drop-target-monitor.html',
      title: 'DropTargetMonitor'
    },
    DRAG_DROP_MONITOR: {
      location: 'docs-drag-drop-monitor.html',
      title: 'DragDropMonitor'
    }
  }
}, {
  title: 'Backends',
  pages: {
    HTML5: {
      location: 'docs-html5.html',
      title: 'HTML5'
    }
  }
}];

export const DOCS_DEFAULT = APIPages[0].pages.OVERVIEW;
