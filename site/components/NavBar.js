"use strict";

var React = require('react');
var Constants = require('../Constants');

require('./NavBar.less');

var GITHUB_URL = 'https://github.com/gaearon/react-dnd';
var DOCS_LOCATION = Constants.DOCS_DEFAULT.location;
var EXAMPLES_LOCATION = Constants.Pages.EXAMPLES.location;

var NavBar = React.createClass({
  render() {
    return (
      <div className="NavBar">
        <div className="NavBar-container">
          <div className="NavBar-item">
            <a href="./" target="_self" className="NavBar-logo">React <b><i>DnD</i></b></a>
          </div>

          <div className="NavBar-item">
            <a className="NavBar-link" href={DOCS_LOCATION} target="_self">Docs</a>
            <a className="NavBar-link" href={EXAMPLES_LOCATION} target="_self">Examples</a>
            <a className="NavBar-link" href={GITHUB_URL}>GitHub</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = NavBar;
