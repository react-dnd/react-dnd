"use strict";

var React = require('react');
var IndexPage = require('./IndexPage');

function renderPath(path, props, onRender) {
  onRender(
    IndexPage.renderToString(props)
  );
}

module.exports = renderPath;
