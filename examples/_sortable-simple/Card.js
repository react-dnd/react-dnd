'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem'
};

const propTypes = {
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  overlappingCardId: PropTypes.bool.isRequired,
  moveCard: PropTypes.func.isRequired,
  connectDragDrop: PropTypes.func.isRequired
};

class Card {
  componentWillReceiveProps(nextProps) {
    if (!this.props.overlappingCardId && nextProps.overlappingCardId) {
      const { id, overlappingCardId } = nextProps;
      if (overlappingCardId !== id) {
        this.props.moveCard(overlappingCardId, id);
      }
    }
  }

  render() {
    const { text, isDragging, connectDragDrop } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      <div ref={connectDragDrop}
           style={{ ...style, opacity }}>
        {text}
      </div>
    );
  }
}

export default configureDragDrop(Card, {
  getHandlers(props, sourceFor, targetFor) {
    return {
      cardSource: sourceFor(ItemTypes.CARD, {
        beginDrag(props) {
          return { id: props.id };
        }
      }),
      cardTarget: targetFor(ItemTypes.CARD)
    };
  },

  getProps(connect, monitor, handlers) {
    return {
      isDragging: monitor.isDragging(handlers.cardSource),
      overlappingCardId: monitor.isOver(handlers.cardTarget) && monitor.getItem().id || null,
      connectDragDrop: connect(handlers.cardSource, handlers.cardTarget)
    };
  }
});