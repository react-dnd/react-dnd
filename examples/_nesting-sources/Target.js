'use strict';

import React from 'react';
import Colors from './Colors';
import { DragDropMixin } from 'react-dnd';

function makeDropTarget(color) {
  return {
    acceptDrop(component) {
      component.setState({
        lastDroppedColor: color
      });
    }
  };
}

const style = {
  border: '1px dashed gray',
  height: '12rem',
  width: '12rem',
  padding: '2rem',
  textAlign: 'center'
};

const Target = React.createClass({
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
    const { lastDroppedColor } = this.state;
    const blueDropState = this.getDropState(Colors.BLUE);
    const yellowDropState = this.getDropState(Colors.YELLOW);
    const isDragging = blueDropState.isDragging || yellowDropState.isDragging;
    const isHovering = blueDropState.isHovering || yellowDropState.isHovering;
    const opacity = isHovering ? 1 : 0.7;

    let backgroundColor = '#fff';
    if (blueDropState.isDragging) {
      backgroundColor = 'lightblue';
    } else if (yellowDropState.isDragging) {
      backgroundColor = 'lightgoldenrodyellow';
    }

    return (
      <div {...this.dropTargetFor(Colors.YELLOW, Colors.BLUE)}
           style={{
             ...style,
             backgroundColor,
             opacity
           }}>

        <p>Drop here.</p>

        {!isDragging && lastDroppedColor &&
          <p>Last dropped: {lastDroppedColor}</p>
        }
      </div>
    );
  }
});

export default Target;