import React, { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { DraggableBox } from './DraggableBox'
import { snapToGrid as doSnapToGrid } from './snapToGrid'
import update from 'immutability-helper'
import { DragItem } from './interfaces'

const styles: React.CSSProperties = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
}

export interface ContainerProps {
  snapToGrid: boolean
}

interface BoxMap {
  [key: string]: { top: number; left: number; title: string }
}

function renderBox(item: any, key: any) {
  return <DraggableBox key={key} id={key} {...item} />
}

export const Container: React.FC<ContainerProps> = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState<BoxMap>({
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
    [boxes],
  )

  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number
        y: number
      }

      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      if (snapToGrid) {
        ;[left, top] = doSnapToGrid(left, top)
      }

      moveBox(item.id, left, top)
      return undefined
    },
  })

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => renderBox(boxes[key], key))}
    </div>
  )
}
