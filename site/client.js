"use strict";

var React = require('react');
var IndexPage = require('./IndexPage');

React.render(
  <IndexPage
    {...window.INITIAL_PROPS}
  />,
  document
);
