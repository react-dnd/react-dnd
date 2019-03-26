import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const Box = ({ connectDragSource }) =>
  connectDragSource(<div style={style}>Drag me</div>)
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: () => ({}),
  },
  connect => ({
    connectDragSource: connect.dragSource(),
  }),
)(Box)
