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
  moveCard: PropTypes.func.isRequired,
  connectDragDrop: PropTypes.func.isRequired
};

class Card {
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
Card.propTypes = propTypes;

export default configureDragDrop(Card, {
  getProps(connect, monitor, handlers) {
    return {
      isDragging: monitor.isDragging(handlers.cardSource),
      connectDragDrop: connect(handlers.cardSource, handlers.cardTarget)
    };
  },

  getHandlers(props, sourceFor, targetFor) {
    return {
      cardSource: sourceFor(ItemTypes.CARD, {
        beginDrag(props) {
          return { id: props.id };
        }
      }),
      cardTarget: targetFor(ItemTypes.CARD, {
        hover(props, monitor) {
          const draggedId = monitor.getItem().id;

          if (draggedId !== props.id) {
            props.moveCard(draggedId, props.id);
          }
        }
      })
    };
  }
});