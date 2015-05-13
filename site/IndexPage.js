import './base.less';
import Constants, { APIPages, Pages } from './Constants';
import HomePage from './pages/HomePage';
import APIPage from './pages/APIPage';
import ExamplesPage from './pages/ExamplesPage';
import React, { Component } from 'react';
import faviconURL from './images/favicon.png';

const APIDocs = {
  DRAG_SOURCE: require('../docs/DragSource.md'),
  DRAG_SOURCE_MONITOR: require('../docs/DragSourceMonitor.md'),
  DRAG_SOURCE_CONNECTOR: require('../docs/DragSourceConnector.md'),
  DROP_TARGET: require('../docs/DropTarget.md'),
  DROP_TARGET_CONNECTOR: require('../docs/DropTargetConnector.md'),
  DROP_TARGET_MONITOR: require('../docs/DropTargetMonitor.md'),
  DRAG_DROP_CONTEXT: require('../docs/DragDropContext.md'),
  DRAG_LAYER: require('../docs/DragLayer.md'),
  DRAG_DROP_MONITOR: require('../docs/DragDropMonitor.md'),
  HTML5: require('../docs/HTML5.md')
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
    case Pages.EXAMPLES.location:
      return <ExamplesPage />;
    }

    const apiKeys = Object.keys(APIPages);
    for (let i = 0; i < apiKeys.length; i++) {
      const key = apiKeys[i];
      const page = APIPages[key];

      if (this.props.location === page.location) {
        return <APIPage example={page}
                        html={APIDocs[key]} />;
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