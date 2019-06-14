import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1rem',
  marginBottom: '1rem',
  cursor: 'move',
}
const SourceBox = ({ showCopyIcon }) => {
  const [{ opacity }, drag] = useDrag({
    item: { type: ItemTypes.BOX },
    options: {
      dropEffect: showCopyIcon ? 'copy' : 'move',
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })
  return (
    <div ref={drag} style={{ ...style, opacity }}>
      When I am over a drop zone, I have {showCopyIcon ? 'copy' : 'no'} icon.
    </div>
  )
}
export default SourceBox
