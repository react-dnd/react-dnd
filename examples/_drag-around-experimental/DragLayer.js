/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Box = require('./Box'),
    { DragFeedbackMixin } = require('react-dnd');

var DragLayer = React.createClass({
  mixins: [DragFeedbackMixin],

  render() {
    var {
      x,
      y,
      draggedItem,
      isDragging
    } = this.state;

    var transform;
    if (isDragging) {
      transform = `translate3d(${x}px, ${y}px, 0)`;
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
            position: 'fixed',
            left: 0,
            top: 0,
            transform: transform,
            WebkitTransform: transform,
            width: '100%',
            height: '100%'
          }}>
            <Box left={0}
                 top={0}
                 id={draggedItem.id}
                 isDragFeedback>
              {draggedItem.children}
            </Box>
          </div>
        }
      </div>
    );
  }
});

module.exports = DragLayer;
