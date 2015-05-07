"use strict";

var React = require('react');

require('./PageBody.less');

var PageBody = React.createClass({
  render() {
    var {html, ...props} = this.props;
    return (
      <div className="PageBody">
        <div className="PageBody-container">
          {this.props.children}
        </div>
      </div>
    );
  },
});

module.exports = PageBody;
