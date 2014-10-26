/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Container = require('./Container'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin');

var DragAroundCustom = React.createClass({
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
          Browser APIs provide no way to change drag preview or its behavior once drag has started.
          Libraries such as jQuery UI implement drag and drop from scratch to work around this, but react-dnd
          only supports browser drag and drop “backend” for now, so we have to accept its limitations.
        </p>
        <p>
          We can, however, customize behavior a great deal if we feed the browser an empty image as drag preview,
          and move the dragged DOM element itself continuously in response to dragover event.
        </p>
        <p>
          With this approach, we miss out on default “return” animation when dropping outside the container.
          However, we get great flexibility in customizing drag feedback and zero flicker.
        </p>
      </div>
    );
  }
});

module.exports = DragAroundCustom;