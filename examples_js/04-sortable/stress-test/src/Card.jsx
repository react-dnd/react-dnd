import React, { memo } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const Card = memo(
  ({ text, isDragging, connectDragSource, connectDropTarget }) => {
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      connectDropTarget(
        <div style={Object.assign({}, style, { opacity })}>{text}</div>,
      ),
    )
  },
)
Card.displayName = 'Card'
export default DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor) {
      const draggedId = monitor.getItem().id
      if (draggedId !== props.id) {
        props.moveCard(draggedId, props.id)
      }
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: props => ({ id: props.id }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(Card),
)
