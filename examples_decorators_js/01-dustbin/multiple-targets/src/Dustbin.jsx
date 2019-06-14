import React from 'react'
import { DropTarget } from 'react-dnd'
const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}
export const Dustbin = ({
  accepts,
  isOver,
  canDrop,
  connectDropTarget,
  lastDroppedItem,
}) => {
  const isActive = isOver && canDrop
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return connectDropTarget(
    <div style={{ ...style, backgroundColor }}>
      {isActive
        ? 'Release to drop'
        : `This dustbin accepts: ${accepts.join(', ')}`}

      {lastDroppedItem && (
        <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
      )}
    </div>,
  )
}
export default DropTarget(
  props => props.accepts,
  {
    drop(props, monitor) {
      props.onDrop(monitor.getItem())
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Dustbin)
