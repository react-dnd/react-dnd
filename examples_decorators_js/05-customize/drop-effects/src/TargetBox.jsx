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
const TargetBox = ({ canDrop, isOver, connectDropTarget }) => {
  const isActive = canDrop && isOver
  return connectDropTarget(
    <div style={style}>{isActive ? 'Release to drop' : 'Drag item here'}</div>,
  )
}
export default DropTarget(ItemTypes.BOX, {}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(TargetBox)
