import type { CSSProperties, FC } from 'react'
import { memo, useCallback, useState } from 'react'
import type { DropTargetMonitor } from 'react-dnd'
import { useDrop } from 'react-dnd'

import { Colors } from './Colors'
import type { DragItem } from './interfaces'

const style: CSSProperties = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}

export interface TargetBoxProps {
  onDrop: (item: any) => void
  lastDroppedColor?: string
}

const TargetBox: FC<TargetBoxProps> = memo(function TargetBox({
  onDrop,
  lastDroppedColor,
}) {
  const [{ isOver, draggingColor, canDrop }, drop] = useDrop(
    () => ({
      accept: [Colors.YELLOW, Colors.BLUE],
      drop(_item: DragItem, monitor) {
        onDrop(monitor.getItemType())
        return undefined
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string,
      }),
    }),
    [onDrop],
  )

  const opacity = isOver ? 1 : 0.7
  let backgroundColor = '#fff'
  switch (draggingColor) {
    case Colors.BLUE:
      backgroundColor = 'lightblue'
      break
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow'
      break
    default:
      break
  }

  return (
    <div
      ref={drop}
      data-color={lastDroppedColor || 'none'}
      style={{ ...style, backgroundColor, opacity }}
      role="TargetBox"
    >
      <p>Drop here.</p>

      {!canDrop && lastDroppedColor && <p>Last dropped: {lastDroppedColor}</p>}
    </div>
  )
})

export interface StatefulTargetBoxState {
  lastDroppedColor: string | null
}
export const StatefulTargetBox: FC = (props) => {
  const [lastDroppedColor, setLastDroppedColor] = useState<string | null>(null)
  const handleDrop = useCallback(
    (color: string) => setLastDroppedColor(color),
    [],
  )

  return (
    <TargetBox
      {...props}
      lastDroppedColor={lastDroppedColor as string}
      onDrop={handleDrop}
    />
  )
}
