import { DragPreviewImage, useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
import { knightImage } from './knightImage.js'
const knightStyle = {
  fontSize: 40,
  fontWeight: 'bold',
  cursor: 'move',
}
export const Knight = () => {
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
