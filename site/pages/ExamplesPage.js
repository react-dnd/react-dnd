"use strict";

var React = require('react');

var Header = require('../components/Header');
var PageBody = require('../components/PageBody');
var SideBar = require('../components/SideBar');
var StaticHTMLBlock = require('../components/StaticHTMLBlock');

var Constants = require('../Constants');

var ExamplesPage = React.createClass({
  render() {
    return (
      <div>
        <Header/>
        <PageBody>
          Examples.
        </PageBody>
      </div>
    );
  }
});

module.exports = ExamplesPage;
