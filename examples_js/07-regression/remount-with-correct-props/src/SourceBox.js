import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'
const getStyle = (isDragging) => {
  const result = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    border: '1px dashed gray',
    opacity: isDragging ? 0.4 : 1,
  }
  if (isDragging) {
    result.backgroundColor = 'red'
  }
  return result
}
export const SourceBox = ({ id, onBeginDrag, onEndDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: () => {
      onBeginDrag()
      return { id }
    },
    isDragging: (monitor) => monitor.getItem().id === id,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: onEndDrag,
  }))
  return (
    <div ref={drag} style={getStyle(isDragging)}>
      Drag me
    </div>
  )
}
