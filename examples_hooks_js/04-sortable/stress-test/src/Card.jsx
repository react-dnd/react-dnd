import React, { memo, useMemo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const Card = memo(({ id, text, moveCard }) => {
  const ref = useRef(null)
  const [{ isDragging }, connectDrag] = useDrag({
    item: { id, type: ItemTypes.CARD },
    collect: monitor => {
      const result = {
        isDragging: monitor.isDragging(),
      }
      return result
    },
  })
  const [, connectDrop] = useDrop({
    accept: ItemTypes.CARD,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        moveCard(draggedId, id)
      }
    },
  })
  connectDrag(ref)
  connectDrop(ref)
  const opacity = isDragging ? 0 : 1
  const containerStyle = useMemo(() => ({ ...style, opacity }), [opacity])
  return (
    <div ref={ref} style={containerStyle}>
      {text}
    </div>
  )
})
export default Card
