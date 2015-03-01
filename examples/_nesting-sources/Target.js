'use strict';

var React = require('react'),
    Colors = require('./Colors'),
    { DragDropMixin } = require('react-dnd');

function makeDropTarget(color) {
  return {
    acceptDrop(component) {
      component.setState({
        lastDroppedColor: color
      });
    }
  };
}

var Target = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(Colors.YELLOW, {
        dropTarget: makeDropTarget(Colors.YELLOW)
      });

      register(Colors.BLUE, {
        dropTarget: makeDropTarget(Colors.BLUE)
      });
    }
  },

  getInitialState() {
    return {
      lastDroppedColor: null
    };
  },

  render() {
    var { lastDroppedColor } = this.state,
        blueDropState = this.getDropState(Colors.BLUE),
        yellowDropState = this.getDropState(Colors.YELLOW),
        isDragging = blueDropState.isDragging || yellowDropState.isDragging,
        isHovering = blueDropState.isHovering || yellowDropState.isHovering,
        backgroundColor = '#fff',
        opacity = isHovering ? 1 : 0.7;

    if (blueDropState.isDragging) {
      backgroundColor = 'lightblue';
    } else if (yellowDropState.isDragging) {
      backgroundColor = 'lightgoldenrodyellow';
    }

    return (
      <div {...this.dropTargetFor(Colors.YELLOW, Colors.BLUE)}
           style={{
             backgroundColor: backgroundColor,
             opacity: opacity,
             border: '1px dashed gray',
             height: '12rem',
             width: '12rem',
             padding: '2rem',
             textAlign: 'center'
           }}>

        <p>Drop here.</p>

        {!isDragging && lastDroppedColor &&
          <p>Last dropped: {lastDroppedColor}</p>
        }
      </div>
    );
  }
});

module.exports = Target;
