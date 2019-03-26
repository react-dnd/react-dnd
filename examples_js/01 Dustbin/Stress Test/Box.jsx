import React, { memo } from 'react'
import { DragSource } from 'react-dnd'
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
const Box = memo(({ name, isDropped, isDragging, connectDragSource }) => {
  const opacity = isDragging ? 0.4 : 1
  return connectDragSource(
    <div style={Object.assign({}, style, { opacity })}>
      {isDropped ? <s>{name}</s> : name}
    </div>,
  )
})
export default DragSource(
  props => props.type,
  {
    beginDrag: props => ({ name: props.name }),
    isDragging(props, monitor) {
      const item = monitor.getItem()
      return props.name === item.name
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Box)
