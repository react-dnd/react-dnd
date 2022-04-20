import type { CSSProperties, FC } from 'react'
import { DragPreviewImage, useDrag } from 'react-dnd'

import { ItemTypes } from './ItemTypes'
import { knightImage } from './knightImage'

const knightStyle: CSSProperties = {
  fontSize: 40,
  fontWeight: 'bold',
  cursor: 'move',
}

export const Knight: FC = () => {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.KNIGHT,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [],
  )

  return (
    <>
      <DragPreviewImage connect={preview} src={knightImage} />
      <div
        ref={drag}
        style={{
          ...knightStyle,
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        ♘
      </div>
    </>
  )
}
