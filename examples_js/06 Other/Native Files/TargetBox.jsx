import * as React from 'react'
import { DropTarget } from 'react-dnd'
const style = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center',
}
const boxTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props, monitor)
    }
  },
}
class TargetBox extends React.Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    return connectDropTarget(
      <div style={style}>
        {isActive ? 'Release to drop' : 'Drag file here'}
      </div>,
    )
  }
}
export default DropTarget(
  props => props.accepts,
  boxTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(TargetBox)
