/** @jsx React.DOM */
'use strict';

var React = require('react'),
    { DragFeedbackMixin } = require('react-dnd');

var DragLayer = React.createClass({
  mixins: [DragFeedbackMixin],

  render() {
    var {
      clientX,
      clientY,
      isDragging
    } = this.state;

    var rect;

    if (this.isMounted()) {
      rect = this.getDOMNode().getBoundingClientRect();
    }

    return (
      <div style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width:'100%',
        height: '100%'
      }}>
        {isDragging &&
          <div style={{
                 position: 'absolute',
                 left: clientX - rect.left - 25,
                 top: clientY - rect.top - 25,
                 width: 50,
                 height: 50,
                 border: '1px gray solid',
                 background: 'yellow'
               }} />
        }
      </div>
    );
  }
});

module.exports = DragLayer;