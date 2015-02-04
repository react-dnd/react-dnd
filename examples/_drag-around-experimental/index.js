/** @jsx React.DOM */
'use strict';

var ReactDND = require('react-dnd');
ReactDND.DragDropMixin.setBackend(ReactDND.DragDropBackends.MouseMove); // FIXME: not sure about this yet
// FIXME: this leaks out into the other examples... I have some ideas on how we can use multiple backends at the same time


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
          <b>This is experimental and is <i>not</i> available in master yet.</b> I'll be working on making this possible in next release.
        </p>
      </div>
    );
  }
});

module.exports = DragAroundExperimental;
