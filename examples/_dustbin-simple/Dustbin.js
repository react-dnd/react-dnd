'use strict';

import React from 'react';
import ItemTypes from './ItemTypes';
import { DragDropMixin } from 'react-dnd';

const itemDropTarget = {
  acceptDrop(component, item) {
    window.alert('You dropped ' + item.name + '!');
  }
};

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  textAlign: 'center'
};

const Dustbin = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.ITEM, {
        dropTarget: itemDropTarget
      });
    }
  },

  render() {
    const dropState = this.getDropState(ItemTypes.ITEM);

    let backgroundColor = '#222';
    if (dropState.isHovering) {
      backgroundColor = 'darkgreen';
    } else if (dropState.isDragging) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div {...this.dropTargetFor(ItemTypes.ITEM)}
           style={{
             ...style,
             backgroundColor
           }}>

        {dropState.isHovering ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
});

export default Dustbin;