export const Pages = {
  HOME: {
    location: 'index.html',
    title: 'Home'
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
    },
    TESTING: {
      location: 'docs-testing.html',
      title: 'Testing'
    },
    FAQ: {
      location: 'docs-faq.html',
      title: 'FAQ'
    },
    TROUBLESHOOTING: {
      location: 'docs-troubleshooting.html',
      title: 'Troubleshooting'
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
    HTML5_BACKEND: {
      location: 'docs-html5-backend.html',
      title: 'HTML5'
    },
    TEST_BACKEND: {
      location: 'docs-test-backend.html',
      title: 'Test'
    }
  }
}];

export const ExamplePages = [{
  title: 'Chessboard',
  pages: {
    CHESSBOARD_TUTORIAL_APP: {
      location: 'examples-chessboard-tutorial-app.html',
      title: 'Tutorial App'
    }
  }
}, {
  title: 'Dustbin',
  pages: {
    DUSTBIN_SINGLE_TARGET: {
      location: 'examples-dustbin-single-target.html',
      title: 'Single Target'
    },
    DUSTBIN_MULTIPLE_TARGETS: {
      location: 'examples-dustbin-multiple-targets.html',
      title: 'Multiple Targets'
    },
    DUSTBIN_STRESS_TEST: {
      location: 'examples-dustbin-stress-test.html',
      title: 'Stress Test'
    }
  }
}, {
  title: 'Drag Around',
  pages: {
    DRAG_AROUND_NAIVE: {
      location: 'examples-drag-around-naive.html',
      title: 'Naive'
    },
    DRAG_AROUND_CUSTOM_DRAG_LAYER: {
      location: 'examples-drag-around-custom-drag-layer.html',
      title: 'Custom Drag Layer'
    }
  }
}, {
  title: 'Nesting',
  pages: {
    NESTING_DRAG_SOURCES: {
      location: 'examples-nesting-drag-sources.html',
      title: 'Drag Sources'
    },
    NESTING_DROP_TARGETS: {
      location: 'examples-nesting-drop-targets.html',
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
    SORTABLE_CANCEL_ON_DROP_OUTSIDE: {
      location: 'examples-sortable-cancel-on-drop-outside.html',
      title: 'Cancel on Drop Outside'
    },
    SORTABLE_STRESS_TEST: {
      location: 'examples-sortable-stress.html',
      title: 'Stress Test'
    }
  }
}, {
  title: 'Customize',
  pages: {
    CUSTOMIZE_HANDLES_AND_PREVIEWS: {
      location: 'examples-customize-handles-and-previews.html',
      title: 'Handles and Previews'
    },
    CUSTOMIZE_DROP_EFFECTS: {
      location: 'examples-customize-drop-effects.html',
      title: 'Drop Effects'
    }
  }
}];

export const DOCS_DEFAULT = APIPages[0].pages.OVERVIEW;
export const EXAMPLES_DEFAULT = ExamplePages[0].pages.CHESSBOARD_TUTORIAL_APP;