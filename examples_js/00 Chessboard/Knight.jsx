import * as React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
import knightImage from './knightImage'
const knightSource = {
  beginDrag() {
    return {}
  },
}
const knightStyle = {
  fontSize: 40,
  fontWeight: 'bold',
  cursor: 'move',
}
const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
})
class Knight extends React.Component {
  componentDidMount() {
    const img = new Image()
    img.src = knightImage
    img.onload = () =>
      this.props.connectDragPreview && this.props.connectDragPreview(img)
  }
  render() {
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div
        style={Object.assign({}, knightStyle, {
          opacity: isDragging ? 0.5 : 1,
        })}
      >
        ♘
      </div>,
    )
  }
}
export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight)
