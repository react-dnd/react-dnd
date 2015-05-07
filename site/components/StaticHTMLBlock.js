"use strict";

var React = require('react');

var StaticHTMLBlock = React.createClass({
  propTypes: {
    html: React.PropTypes.string.isRequired
  },

  shouldComponentUpdate() {
    return false;
  },

  render() {
    var {html, ...props} = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{__html: html}}
        {...props}
      />
    );
  },
});

module.exports = StaticHTMLBlock;
