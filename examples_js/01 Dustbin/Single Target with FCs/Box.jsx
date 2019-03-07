import * as React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from '../Single Target/ItemTypes'
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
const Box = ({ isDragging, connectDragSource, name }) => {
  const opacity = isDragging ? 0.4 : 1
  const ref = React.createRef()
  return connectDragSource
    ? connectDragSource(
        <div ref={ref} style={Object.assign({}, style, { opacity })}>
          {name}
        </div>,
      )
    : null
}
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag(props) {
      return {
        name: props.name,
      }
    },
    endDrag(props, monitor) {
      const item = monitor.getItem()
      const dropResult = monitor.getDropResult()
      if (dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Box)
