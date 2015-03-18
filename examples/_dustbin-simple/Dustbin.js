'use strict';

import React, { PropTypes, createClass } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget, ObservePolyfill } from 'react-dnd';

class DustbinDropTarget extends DropTarget {
  drop() {
    return { name: 'Dustbin' };
  }
}

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  textAlign: 'center'
};

const Dustbin = createClass({
  contextTypes: {
    dragDrop: PropTypes.object.isRequired
  },

  mixins: [ObservePolyfill({
    constructor() {
      this.dropTarget = new DustbinDropTarget(this);
    },

    observe() {
      return {
        dropTarget: this.dropTarget.connectTo(this.context.dragDrop, ItemTypes.BOX)
      };
    }
  })],

  render() {
    const { canDrop, isOver, ref } = this.state.data.dropTarget;

    let backgroundColor = '#222';
    if (isOver) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div ref={ref}
           style={{ ...style, backgroundColor }}>
        {isOver ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
});

export default Dustbin;
