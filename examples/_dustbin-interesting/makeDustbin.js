'use strict';

import React from 'react';
import { DragDropMixin } from 'react-dnd';

const dropTarget = {
  acceptDrop(component, item) {
    component.setState({
      lastDroppedItem: item
    });
  }
};

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  margin: '0.5rem',
  textAlign: 'center',
  float: 'left'
};

export default function makeDustbin(accepts) {
  const Dustbin = React.createClass({
    mixins: [DragDropMixin],

    getInitialState() {
      return {
        lastDroppedItem: null
      };
    },

    statics: {
      configureDragDrop(register) {
        accepts.forEach(itemType => {
          register(itemType, { dropTarget });
        });
      }
    },

    render() {
      const { lastDroppedItem } = this.state;
      const dropStates = accepts.map(this.getDropState);

      let backgroundColor = '#222';
      if (dropStates.some(s => s.isHovering)) {
        backgroundColor = 'darkgreen';
      } else if (dropStates.some(s => s.isDragging)) {
        backgroundColor = 'darkkhaki';
      }

      return (
        <div {...this.dropTargetFor.apply(this, accepts)}
             style={{
               ...style,
               backgroundColor
             }}>

          {dropStates.some(s => s.isHovering) ?
            'Release to drop' :
            'This dustbin accepts: ' + accepts.join(', ')
          }

          {lastDroppedItem &&
            <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
          }
        </div>
      );
    }
  });

  return Dustbin;
}