'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: '20em'
};

const CardSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

const CardTarget = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;

    if (draggedId !== props.id) {
      props.moveCard(draggedId, props.id);
    }
  }
};

@configureDragDrop(
  register => ({
    cardSource: register.dragSource(ItemTypes.CARD, CardSource),
    cardTarget: register.dropTarget(ItemTypes.CARD, CardTarget)
  }),

  ({ cardSource, cardTarget }) => ({
    connectDragSource: cardSource.connect(),
    connectDropTarget: cardTarget.connect(),
    isDragging: cardSource.isDragging()
  })
)
export default class Card {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  render() {
    const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
    const opacity = isDragging ? 0 : 1;

    return (
      <div ref={c => { connectDragSource(c); connectDropTarget(c); }}
           style={{ ...style, opacity }}>
        {text}
      </div>
    );
  }
}