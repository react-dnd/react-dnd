export const Pages = {
  HOME: {
    location: 'index.html',
    title: 'Home'
  }
};

export const ExamplePages = [{
  title: 'Dustbin',
  pages: {
    DUSTBIN_SIMPLE: {
      location: 'examples-dustbin-simple.html',
      title: 'Single Target'
    },
    DUSTBIN_INTERESTING: {
      location: 'examples-dustbin-interesting.html',
      title: 'Multiple Targets'
    },
    DUSTBIN_STRESS: {
      location: 'examples-dustbin-stress.html',
      title: 'Stress Test'
    }
  }
}, {
  title: 'Drag Around',
  pages: {
    DRAG_AROUND_NAIVE: {
      location: 'examples-drag-around-naive.html',
      title: 'Naïve'
    },
    DRAG_AROUND_CUSTOM: {
      location: 'examples-drag-around-custom.html',
      title: 'Custom Drag Layer'
    }
  }
}, {
  title: 'Nesting',
  pages: {
    NESTING_SOURCES: {
      location: 'examples-nesting-sources.html',
      title: 'Drag Sources'
    },
    NESTING_TARGETS: {
      location: 'examples-nesting-targets.html',
      title: 'Drop Targets'
    }
  }
}, {
  title: 'Sortable',
  pages: {
    SORTABLE_SIMPLE: {
      location: 'examples-sortable-simple.html',
      title: 'Simple'
    },
    SORTABLE_CANCELABLE: {
      location: 'examples-sortable-cancelable.html',
      title: 'Cancel on Drop Outside'
    },
    SORTABLE_STRESS: {
      location: 'examples-sortable-stress.html',
      title: 'Stress Test'
    }
  }
}, {
  title: 'Customization',
  pages: {
    CUSTOMIZE_HANDLES: {
      location: 'examples-customize-handles.html',
      title: 'Handles and Previews'
    },
    CUSTOMIZE_EFFECTS: {
      location: 'examples-customize-effects.html',
      title: 'Drop Effects'
    }
  }
}];

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
    DRAG_LAYER_MONITOR: {
      location: 'docs-drag-layer-monitor.html',
      title: 'DragLayerMonitor'
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
export const EXAMPLES_DEFAULT = ExamplePages[0].pages.DUSTBIN_SIMPLE;