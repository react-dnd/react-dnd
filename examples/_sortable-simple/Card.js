'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragDropMixin } from 'react-dnd';

const dragSource = {
  beginDrag(component) {
    return {
      item: {
        id: component.props.id
      }
    };
  }
};

const dropTarget = {
  over(component, item) {
    component.props.moveCard(item.id, component.props.id);
  }
};

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem'
};

const Card = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  },

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.CARD, {
        dragSource,
        dropTarget
      });
    }
  },

  render() {
    const { text } = this.props;
    const { isDragging } = this.getDragState(ItemTypes.CARD);
    const opacity = isDragging ? 0 : 1;

    return (
      <div {...this.dragSourceFor(ItemTypes.CARD)}
           {...this.dropTargetFor(ItemTypes.CARD)}
           style={{
             ...style,
             opacity
           }}>
        {text}
      </div>
    );
  }
});

export default Card;