import './base.less';
import Constants, { APIPages, ExamplePages, Pages } from './Constants';
import HomePage from './pages/HomePage';
import APIPage from './pages/APIPage';
import ExamplePage from './pages/ExamplePage';
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';

const APIDocs = {
  OVERVIEW: require('../docs/00 Quick Start/Overview.md'),
  TUTORIAL: require('../docs/00 Quick Start/Tutorial.md'),
  TESTING: require('../docs/00 Quick Start/Testing.md'),
  FAQ: require('../docs/00 Quick Start/FAQ.md'),
  TROUBLESHOOTING: require('../docs/00 Quick Start/Troubleshooting.md'),
  DRAG_SOURCE: require('../docs/01 Top Level API/DragSource.md'),
  DRAG_SOURCE_MONITOR: require('../docs/03 Monitoring State/DragSourceMonitor.md'),
  DRAG_SOURCE_CONNECTOR: require('../docs/02 Connecting to DOM/DragSourceConnector.md'),
  DROP_TARGET: require('../docs/01 Top Level API/DropTarget.md'),
  DROP_TARGET_CONNECTOR: require('../docs/02 Connecting to DOM/DropTargetConnector.md'),
  DROP_TARGET_MONITOR: require('../docs/03 Monitoring State/DropTargetMonitor.md'),
  DRAG_DROP_CONTEXT: require('../docs/01 Top Level API/DragDropContext.md'),
  DRAG_LAYER: require('../docs/01 Top Level API/DragLayer.md'),
  DRAG_LAYER_MONITOR: require('../docs/03 Monitoring State/DragLayerMonitor.md'),
  HTML5_BACKEND: require('../docs/04 Backends/HTML5.md'),
  TEST_BACKEND: require('../docs/04 Backends/Test.md')
};

const Examples = {
  CHESSBOARD_TUTORIAL_APP: require('../examples/00 Chessboard/Tutorial App'),
  DUSTBIN_SINGLE_TARGET: require('../examples/01 Dustbin/Single Target'),
  DUSTBIN_MULTIPLE_TARGETS: require('../examples/01 Dustbin/Multiple Targets'),
  DUSTBIN_STRESS_TEST: require('../examples/01 Dustbin/Stress Test'),
  DRAG_AROUND_NAIVE: require('../examples/02 Drag Around/Naive'),
  DRAG_AROUND_CUSTOM_DRAG_LAYER: require('../examples/02 Drag Around/Custom Drag Layer'),
  NESTING_DRAG_SOURCES: require('../examples/03 Nesting/Drag Sources'),
  NESTING_DROP_TARGETS: require('../examples/03 Nesting/Drop Targets'),
  SORTABLE_SIMPLE: require('../examples/04 Sortable/Simple'),
  SORTABLE_CANCEL_ON_DROP_OUTSIDE: require('../examples/04 Sortable/Cancel on Drop Outside'),
  SORTABLE_STRESS_TEST: require('../examples/04 Sortable/Stress Test'),
  CUSTOMIZE_HANDLES_AND_PREVIEWS: require('../examples/05 Customize/Handles and Previews'),
  CUSTOMIZE_DROP_EFFECTS: require('../examples/05 Customize/Drop Effects')
};

export default class IndexPage extends Component {
  static getDoctype() {
    return '<!doctype html>';
  }

  static renderToString(props) {
    return IndexPage.getDoctype() +
           ReactDOMServer.renderToString(<IndexPage {...props} />);
  }

  constructor(props) {
    super(props);
    this.state = {
      renderPage: !this.props.devMode
    };
  }

  render() {
    // Dump out our current props to a global object via a script tag so
    // when initialising the browser environment we can bootstrap from the
    // same props as what each page was rendered with.
    const browserInitScriptObj = {
      __html: 'window.INITIAL_PROPS = ' + JSON.stringify(this.props) + ';\n'
    };

    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>React DnD</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
          <link rel="stylesheet" type="text/css" href={this.props.files['main.css']} />
          <base target="_blank" />
        </head>
        <body>
          {this.state.renderPage && this.renderPage()}

          <script dangerouslySetInnerHTML={browserInitScriptObj} />
          <script src={this.props.files['main.js']}></script>
        </body>
      </html>
    );
  }

  renderPage() {
    switch (this.props.location) {
    case Pages.HOME.location:
      return <HomePage />;
    }

    for (let groupIndex in APIPages) {
      const group = APIPages[groupIndex];
      const pageKeys = Object.keys(group.pages);

      for (let i = 0; i < pageKeys.length; i++) {
        const key = pageKeys[i];
        const page = group.pages[key];

        if (this.props.location === page.location) {
          return <APIPage example={page}
                          html={APIDocs[key]} />;
        }
      }
    }

    for (let groupIndex in ExamplePages) {
      const group = ExamplePages[groupIndex];
      const pageKeys = Object.keys(group.pages);

      for (let i = 0; i < pageKeys.length; i++) {
        const key = pageKeys[i];
        const page = group.pages[key];
        const Component = Examples[key];

        if (this.props.location === page.location) {
          return (
            <ExamplePage example={page}>
              <Component />
            </ExamplePage>
          );
        }
      }
    }

    throw new Error(
      'Page of location ' +
        JSON.stringify(this.props.location) +
        ' not found.'
    );
  }

  componentDidMount() {
    if (!this.state.renderPage) {
      this.setState({
        renderPage: true
      });
    }
  }
}
