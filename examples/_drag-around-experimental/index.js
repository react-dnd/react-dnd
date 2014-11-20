/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Container = require('./Container'),
    DragLayer = require('./DragLayer'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin');

var DragAroundExperimental = React.createClass({
  render() {
    return (
      <div>
        <Container />
        <DragLayer />
        <hr />
        <p>
          Just messing around.
        </p>
      </div>
    );
  }
});

module.exports = DragAroundExperimental;