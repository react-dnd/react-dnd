import React from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}
const TargetBox = ({ connectDropTarget, isActive }) => {
  return connectDropTarget(
    <div style={style}>{isActive ? 'Release to drop' : 'Drag item here'}</div>,
  )
}
export default DropTarget(ItemTypes.BOX, {}, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isActive: monitor.isOver() && monitor.canDrop(),
  }
})(TargetBox)
