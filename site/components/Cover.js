"use strict";

var React = require('react');

require('./Cover.less');

var Cover = React.createClass({
  render() {
    return (
      <div className="Cover">
        <div className="Cover-header">
          <p className="Cover-description">
            Drag and Drop for React
          </p>
        </div>
      </div>
    );
  },
});

module.exports = Cover;
