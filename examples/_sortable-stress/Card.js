'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import shallowEqual from 'react/lib/shallowEqual';
import { configureDragDrop, joinRefs } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: '20em'
};

const propTypes = {
  id: PropTypes.any.isRequired,
  text: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  moveCard: PropTypes.func.isRequired,
  dragSourceRef: PropTypes.func.isRequired,
  dropTargetRef: PropTypes.func.isRequired
};

class Card {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }

  render() {
    const { text, isDragging, dragSourceRef, dropTargetRef } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      <div ref={joinRefs(dragSourceRef, dropTargetRef)}
           style={{ ...style, opacity }}>
        {text}
      </div>
    );
  }
}
Card.propTypes = propTypes;

const cardSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

const cardTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveCard(draggedId, props.id);
    }
  }
};

export default configureDragDrop(Card, {
  arePropsEqual: shallowEqual,

  configure: (register) => ({
    cardSourceId: register.dragSource(ItemTypes.CARD, cardSource),
    cardTargetId: register.dropTarget(ItemTypes.CARD, cardTarget)
  }),

  inject: (connect, monitor, { cardSourceId, cardTargetId }) => ({
    isDragging: monitor.isDragging(cardSourceId),
    dragSourceRef: connect.dragSource(cardSourceId),
    dropTargetRef: connect.dropTarget(cardTargetId)
  })
});