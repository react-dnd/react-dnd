import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragId = monitor.getItem().id;
    const hoverId = props.id;
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
  
    // Determine rectangle on screen
    const boundingRect = React.findDOMNode(component).getBoundingClientRect();

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get vertical middle
    const ownMiddleY = (boundingRect.bottom - boundingRect.top) / 2;

    // Get pixels to the top
    const offsetY = clientOffset.y - boundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
  
    // Dragging downwards
    if (dragIndex < hoverIndex && offsetY < ownMiddleY) {
      return;
    }
  
    // Dragging upwards
    if (dragIndex > hoverIndex && offsetY > ownMiddleY) {
      return;
    }

    // Don't replace items with themselves
    if (dragId === hoverId) {
      return;
    }
  
    // Time to actually perform the action
    props.moveCard(dragId, hoverId);
  }
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
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

    return connectDragSource(connectDropTarget(
      <div style={{ ...style, opacity }}>
        {text}
      </div>
    ));
  }
}
