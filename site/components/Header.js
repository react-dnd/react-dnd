"use strict";

var React = require('react');
var PropTypes = React.PropTypes;

var NavBar = require('./NavBar');
var Cover = require('./Cover');

require('./Header.less');

var Header = React.createClass({
  propTypes: {
    showCover: React.PropTypes.bool
  },

  render() {
    return (
      <header className="Header">
        <NavBar />

        {this.props.showCover &&
          <Cover />
        }
      </header>
    );
  },
});

module.exports = Header;
