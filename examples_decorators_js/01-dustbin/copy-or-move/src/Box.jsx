import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  float: 'left',
}
const Box = ({ name, isDragging, connectDragSource }) => {
  const opacity = isDragging ? 0.4 : 1
  return connectDragSource(<div style={{ ...style, opacity }}>{name}</div>)
}
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: props => ({ name: props.name }),
    endDrag(props, monitor) {
      const item = monitor.getItem()
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        let alertMessage = ''
        const isDropAllowed =
          dropResult.allowedDropEffect === 'any' ||
          dropResult.allowedDropEffect === dropResult.dropEffect
        if (isDropAllowed) {
          const isCopyAction = dropResult.dropEffect === 'copy'
          const actionName = isCopyAction ? 'copied' : 'moved'
          alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`
        } else {
          alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`
        }
        alert(alertMessage)
      }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Box)
