"use strict";

var React = require('react');

var Header = require('../components/Header');
var PageBody = require('../components/PageBody');
var SideBar = require('../components/SideBar');
var StaticHTMLBlock = require('../components/StaticHTMLBlock');

var Constants = require('../Constants');

var APIPage = React.createClass({
  render() {
    return (
      <div>
        <Header/>

        <PageBody>
          <SideBar
            title="API"
            pages={Constants.APIPages}
            example={this.props.example}
          />

          <StaticHTMLBlock html={this.props.html} />
        </PageBody>
      </div>
    );
  }
});

module.exports = APIPage;
