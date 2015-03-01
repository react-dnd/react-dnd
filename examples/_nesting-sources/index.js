'use strict';

var React = require('react'),
    Container = require('./Container');

var NestingSources = React.createClass({
  render() {
    return (
      <div>
        <Container />
        <hr />
        <p>
          You can nest drag sources in one another. If a nested drag source returns false in <code>canDrag</code>, its parent will be asked, until a draggable source is found and activated.
        </p>
      </div>
    );
  }
});

module.exports = NestingSources;