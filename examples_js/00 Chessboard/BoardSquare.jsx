import * as React from 'react'
import { DropTarget } from 'react-dnd'
import { Square } from './Square'
import { canMoveKnight, moveKnight } from './Game'
import ItemTypes from './ItemTypes'
import Overlay from './Overlay'
const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.x, props.y)
  },
  drop(props) {
    moveKnight(props.x, props.y)
  },
}
const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: !!monitor.isOver(),
    canDrop: !!monitor.canDrop(),
  }
}
class BoardSquare extends React.Component {
  render() {
    const { x, y, connectDropTarget, isOver, canDrop, children } = this.props
    const black = (x + y) % 2 === 1
    return connectDropTarget(
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <Square black={black}>{children}</Square>
        {isOver && !canDrop && <Overlay color="red" />}
        {!isOver && canDrop && <Overlay color="yellow" />}
        {isOver && canDrop && <Overlay color="green" />}
      </div>,
    )
  }
}
export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare)
