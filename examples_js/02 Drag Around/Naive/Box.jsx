import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
}
const Box = ({
  hideSourceOnDrag,
  left,
  top,
  connectDragSource,
  isDragging,
  children,
}) => {
  if (isDragging && hideSourceOnDrag) {
    return null
  }
  return connectDragSource(
    <div style={Object.assign({}, style, { left, top })}>{children}</div>,
  )
}
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag(props) {
      const { id, left, top } = props
      return { id, left, top }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Box)
