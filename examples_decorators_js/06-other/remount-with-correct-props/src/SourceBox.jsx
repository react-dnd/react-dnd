import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
const getStyle = isDragging => ({
  display: 'inline-block',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  border: '1px dashed gray',
  backgroundColor: isDragging ? 'red' : undefined,
  opacity: isDragging ? 0.4 : 1,
})
const SourceBox = ({ isDragging, connectDragSource }) => {
  return connectDragSource(<div style={getStyle(isDragging)}>Drag me</div>)
}
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: props => {
      props.onBeginDrag()
      return { id: props.id }
    },
    endDrag: props => {
      props.onEndDrag()
    },
    isDragging: (props, monitor) => monitor.getItem().id === props.id,
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(SourceBox)
