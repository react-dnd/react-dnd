import * as React from 'react'
import { DragSource } from 'react-dnd'
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
}
class Box extends React.Component {
  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props
    const opacity = isDragging ? 0.4 : 1
    return connectDragSource(
      <div style={Object.assign({}, style, { opacity })}>
        {isDropped ? <s>{name}</s> : name}
      </div>,
    )
  }
}
export default DragSource(
  props => props.type,
  boxSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Box)
