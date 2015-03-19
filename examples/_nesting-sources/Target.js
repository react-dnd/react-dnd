'use strict';

import React, { PropTypes, createClass } from 'react';
import Colors from './Colors';
import { DropTarget, ObservePolyfill } from 'react-dnd';

class ColorDropTarget extends DropTarget {
  drop(monitor) {
    this.component.setState({
      lastDroppedColor: monitor.getItemType()
    });
  }
}

const style = {
  border: '1px dashed gray',
  height: '12rem',
  width: '12rem',
  padding: '2rem',
  textAlign: 'center'
};

const Target = createClass({
  contextTypes: {
    dragDrop: PropTypes.object.isRequired
  },

  mixins: [ObservePolyfill({
    constructor() {
      this.dropTarget = new ColorDropTarget(this);
    },

    observe() {
      return {
        dropTarget: this.dropTarget.connectTo(this.context.dragDrop, [Colors.YELLOW, Colors.BLUE])
      };
    }
  })],

  getInitialState() {
    return {
      lastDroppedColor: null
    };
  },

  render() {
    const { lastDroppedColor } = this.state;
    const { canDrop, isOver, itemType, ref } = this.state.data.dropTarget;
    const opacity = isOver ? 1 : 0.7;

    let backgroundColor = '#fff';
    switch (itemType) {
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    }

    return (
      <div ref={ref}
           style={{ ...style, backgroundColor, opacity }}>

        <p>Drop here.</p>

        {!canDrop && lastDroppedColor &&
          <p>Last dropped: {lastDroppedColor}</p>
        }
      </div>
    );
  }
});

export default Target;