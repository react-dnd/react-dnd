"use strict";

require('./base.less');

var Constants = require('./Constants');
var HomePage = require('./pages/HomePage');
var APIPage = require('./pages/APIPage');
var ExamplesPage = require('./pages/ExamplesPage');
var React = require('react');

var faviconURL = require('./images/favicon.png');

var APIPages = Constants.APIPages;
var Pages = Constants.Pages;

var APIDocs = {
  DRAG_SOURCE: require('../docs/DragSource.md'),
  DRAG_SOURCE_MONITOR: require('../docs/DragSourceMonitor.md'),
  DROP_TARGET: require('../docs/DropTarget.md'),
  DROP_TARGET_MONITOR: require('../docs/DropTargetMonitor.md'),
  DRAG_DROP_CONTEXT: require('../docs/DragDropContext.md'),
  DRAG_LAYER: require('../docs/DragLayer.md'),
  DRAG_DROP_MONITOR: require('../docs/DragDropMonitor.md'),
  HTML5: require('../docs/HTML5.md')
};

var IndexPage = React.createClass({
  statics: {
    getDoctype() {
      return '<!doctype html>';
    },

    renderToString(props) {
      return IndexPage.getDoctype() +
        React.renderToString(<IndexPage {...props} />);
    },
  },

  getInitialState() {
    return {
      renderPage: !this.props.devMode
    };
  },

  render() {
    // Dump out our current props to a global object via a script tag so
    // when initialising the browser environment we can bootstrap from the
    // same props as what each page was rendered with.
    var browserInitScriptObj = {
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
  },

  renderPage() {
    switch (this.props.location) {
    case Pages.HOME.location:
      return <HomePage />;
    case Pages.EXAMPLES.location:
      return <ExamplesPage />;
    }

    var apiKeys = Object.keys(APIPages);
    for (var i = 0; i < apiKeys.length; i++) {
      var key = apiKeys[i];
      var page = APIPages[key];

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
  },

  componentDidMount() {
    if (!this.state.renderPage) {
      this.setState({
        renderPage: true
      });
    }
  }
});

module.exports = IndexPage;
