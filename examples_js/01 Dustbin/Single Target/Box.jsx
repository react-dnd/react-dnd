import React from 'react'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
const boxSource = {
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
}
class Box extends React.Component {
  constructor() {
    super(...arguments)
    this.dragSource = React.createRef()
  }
  render() {
    const { name, isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0.4 : 1
    connectDragSource(this.dragSource)
    return (
      <div ref={this.dragSource} style={Object.assign({}, style, { opacity })}>
        {name}
      </div>
    )
  }
}
export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Box)
