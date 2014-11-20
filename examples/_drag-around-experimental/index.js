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
          Try dragging an item. It will change while being animated.
        </p>
        <p>
          This is experimental and is <b>not</b> available in master yet. I'll be working on making this possible in next release.
        </p>
      </div>
    );
  }
});

module.exports = DragAroundExperimental;