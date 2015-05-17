import './base.less';
import Constants, { APIPages, ExamplePages, Pages } from './Constants';
import HomePage from './pages/HomePage';
import APIPage from './pages/APIPage';
import ExamplePage from './pages/ExamplePage';
import React, { Component } from 'react';
import faviconURL from './images/favicon.png';

const APIDocs = {
  OVERVIEW: require('../docs/00 Quick Start/Overview.md'),
  TUTORIAL: require('../docs/00 Quick Start/Tutorial.md'),
  DRAG_SOURCE: require('../docs/01 Top Level API/DragSource.md'),
  DRAG_SOURCE_MONITOR: require('../docs/03 Monitoring State/DragSourceMonitor.md'),
  DRAG_SOURCE_CONNECTOR: require('../docs/02 Connecting to DOM/DragSourceConnector.md'),
  DROP_TARGET: require('../docs/01 Top Level API/DropTarget.md'),
  DROP_TARGET_CONNECTOR: require('../docs/02 Connecting to DOM/DropTargetConnector.md'),
  DROP_TARGET_MONITOR: require('../docs/03 Monitoring State/DropTargetMonitor.md'),
  DRAG_DROP_CONTEXT: require('../docs/01 Top Level API/DragDropContext.md'),
  DRAG_LAYER: require('../docs/01 Top Level API/DragLayer.md'),
  DRAG_LAYER_MONITOR: require('../docs/03 Monitoring State/DragLayerMonitor.md'),
  HTML5: require('../docs/04 Backends/HTML5.md')
};

const Examples = {
  DUSTBIN_SIMPLE: require('../examples/_dustbin-simple'),
  DUSTBIN_INTERESTING: require('../examples/_dustbin-interesting'),
  DUSTBIN_STRESS: require('../examples/_dustbin-stress'),
  DRAG_AROUND_NAIVE: require('../examples/_drag-around-naive'),
  DRAG_AROUND_CUSTOM: require('../examples/_drag-around-custom'),
  NESTING_SOURCES: require('../examples/_nesting-sources'),
  NESTING_TARGETS: require('../examples/_nesting-targets'),
  SORTABLE_SIMPLE: require('../examples/_sortable-simple'),
  SORTABLE_CANCELABLE: require('../examples/_sortable-cancelable'),
  SORTABLE_STRESS: require('../examples/_sortable-stress'),
  CUSTOMIZE_HANDLES: require('../examples/_customize-handles'),
  CUSTOMIZE_EFFECTS: require('../examples/_customize-effects')
};

export default class IndexPage extends Component {
  static getDoctype() {
    return '<!doctype html>';
  }

  static renderToString(props) {
    return IndexPage.getDoctype() +
           React.renderToString(<IndexPage {...props} />);
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
          <link rel="shortcut icon" type="image/png" href={faviconURL} />
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