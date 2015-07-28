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
    return { id: props.id };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const ownId = props.id;
    const draggedId = monitor.getItem().id;
    if (draggedId === ownId) {
      return;
    }
  
    // assuming something like findTodoIndex is implemented
    const ownIndex = props.findTodoIndex(ownId);
    const draggedIndex = props.findTodoIndex(draggedId);
  
    // What is my rectangle on screen?
    const boundingRect = React.findDOMNode(component).getBoundingClientRect();
    // Where is the mouse right now?
    const clientOffset = monitor.getClientOffset();
    // Where is my vertical middle?
    const ownMiddleY = (boundingRect.bottom - boundingRect.top) / 2;
    // How many pixels to the top?
    const offsetY = clientOffset.y - boundingRect.top;
  
    // We only want to move when the mouse has crossed half of the item's height.
    // If we're dragging down, we want to move only if we're below 50%.
    // If we're dragging up, we want to move only if we're above 50%.
  
    // Moving down: exit if we're in upper half
    if (draggedIndex < ownIndex && offsetY < ownMiddleY) {
      return;
    }
  
    // Moving up: exit if we're in lower half
    if (draggedIndex > ownIndex && offsetY > ownMiddleY) {
      return;
    }
  
    // Time to actually perform the action!
    props.moveCard(draggedId, ownId);
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
