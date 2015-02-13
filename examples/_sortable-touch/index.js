'use strict';

var React = require('react'),
    Container = require('./Container'),
    DragLayer = require('./DragLayer');

var DustbinSimple = React.createClass({
  render() {
    return (
      <div>
        <Container />
        <DragLayer />
        <hr />
        <p>
        </p>
      </div>
    );
  }
});

module.exports = DustbinSimple;
