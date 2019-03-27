import React from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'
const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative',
}
class Container extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      boxes: {
        a: { top: 20, left: 80, title: 'Drag me around' },
        b: { top: 180, left: 20, title: 'Drag me too' },
      },
    }
  }
  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props
    const { boxes } = this.state
    return connectDropTarget(
      <div style={styles}>
        {Object.keys(boxes).map(key => {
          const { left, top, title } = boxes[key]
          return (
            <Box
              key={key}
              id={key}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
            >
              {title}
            </Box>
          )
        })}
      </div>,
    )
  }
  moveBox(id, left, top) {
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top },
          },
        },
      }),
    )
  }
}
export default DropTarget(
  ItemTypes.BOX,
  {
    drop(props, monitor, component) {
      if (!component) {
        return
      }
      const item = monitor.getItem()
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      component.moveBox(item.id, left, top)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(Container)
