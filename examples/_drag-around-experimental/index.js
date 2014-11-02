/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Container = require('./Container'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin');

var DragAroundExperimental = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      snapToGrid: false
    };
  },

  render() {
    return (
      <div>
        <Container snapToGrid={this.state.snapToGrid} />
        <p>
          <input type='checkbox'
                 checkedLink={this.linkState('snapToGrid')}>
            Snap to grid
          </input>
        </p>
        <hr />
        <p>
          Just messing around.
        </p>
      </div>
    );
  }
});

module.exports = DragAroundExperimental;