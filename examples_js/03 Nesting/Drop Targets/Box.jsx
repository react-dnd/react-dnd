import * as React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
}
const boxSource = {
  beginDrag() {
    return {}
  },
}
class Box extends React.Component {
  render() {
    const { connectDragSource } = this.props
    return connectDragSource(<div style={style}>Drag me</div>)
  }
}
export default DragSource(ItemTypes.BOX, boxSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(Box)
