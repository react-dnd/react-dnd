import React, { useState, useCallback } from 'react'
import { ConnectDragSource, DragSourceMonitor } from 'react-dnd'
import { DragSource, DragSourceConnector } from 'react-dnd'
import Colors from './Colors'

const style: React.CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}

export interface SourceBoxProps {
  color?: string
  forbidDrag?: boolean
  onToggleForbidDrag?: () => void

  connectDragSource: ConnectDragSource
  isDragging: boolean
}

const SourceBoxRaw: React.FC<SourceBoxProps> = ({
  color,
  children,
  isDragging,
  connectDragSource,
  forbidDrag,
  onToggleForbidDrag,
}) => {
  const opacity = isDragging ? 0.4 : 1

  let backgroundColor
  switch (color) {
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow'
      break
    case Colors.BLUE:
      backgroundColor = 'lightblue'
      break
    default:
      break
  }

  return connectDragSource(
    <div
      style={{
        ...style,
        backgroundColor,
        opacity,
        cursor: forbidDrag ? 'default' : 'move',
      }}
    >
      <input
        type="checkbox"
        checked={forbidDrag}
        onChange={onToggleForbidDrag}
      />
      <small>Forbid drag</small>
      {children}
    </div>,
  )
}

const SourceBox = DragSource(
  (props: SourceBoxProps) => props.color + '',
  {
    canDrag: (props: SourceBoxProps) => !props.forbidDrag,
    beginDrag: () => ({}),
  },
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(SourceBoxRaw)

export interface StatefulSourceBoxProps {
  color: string
}

const StatefulSourceBox: React.FC<StatefulSourceBoxProps> = props => {
  const [forbidDrag, setForbidDrag] = useState(false)
  const handleToggleForbidDrag = useCallback(() => {
    setForbidDrag(!forbidDrag)
  }, [forbidDrag])

  return (
    <SourceBox
      {...props}
      forbidDrag={forbidDrag}
      onToggleForbidDrag={() => handleToggleForbidDrag()}
    />
  )
}

export default StatefulSourceBox
