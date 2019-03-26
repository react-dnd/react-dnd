import React from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}
const boxTarget = {
  drop: () => ({ name: 'Dustbin' }),
}
class Dustbin extends React.Component {
  constructor() {
    super(...arguments)
    this.dropTarget = React.createRef()
  }
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    connectDropTarget(this.dropTarget)
    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
    return (
      <div
        ref={this.dropTarget}
        style={Object.assign({}, style, { backgroundColor })}
      >
        {isActive ? 'Release to drop' : 'Drag a box here'}
      </div>
    )
  }
}
export default DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(Dustbin)
