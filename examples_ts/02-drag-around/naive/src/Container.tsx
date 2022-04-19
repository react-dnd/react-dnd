import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { useCallback, useState } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDrop } from 'react-dnd'

import { Box } from './Box'
import type { DragItem } from './interfaces'
import { ItemTypes } from './ItemTypes'

const styles: CSSProperties = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
}

export interface ContainerProps {
  hideSourceOnDrag: boolean
}

export interface ContainerState {
  boxes: { [key: string]: { top: number; left: number; title: string } }
}

export const Container: FC<ContainerProps> = ({ hideSourceOnDrag }) => {
  const [boxes, setBoxes] = useState<{
    [key: string]: {
      top: number
      left: number
      title: string
    }
  }>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  })

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes, setBoxes],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key] as {
          top: number
          left: number
          title: string
        }
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        )
      })}
    </div>
  )
}
