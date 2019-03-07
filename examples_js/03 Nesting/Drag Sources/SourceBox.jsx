// tslint:disable max-classes-per-file jsx-no-lambda
import React from 'react'
import { DragSource } from 'react-dnd'
import Colors from './Colors'
const style = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}
const ColorSource = {
  canDrag(props) {
    return !props.forbidDrag
  },
  beginDrag() {
    return {}
  },
}
class SourceBoxRaw extends React.Component {
  render() {
    const {
      color,
      children,
      isDragging,
      connectDragSource,
      forbidDrag,
      onToggleForbidDrag,
    } = this.props
    const opacity = isDragging ? 0.4 : 1
    let backgroundColor
    switch (color) {
      case Colors.YELLOW:
        backgroundColor = 'lightgoldenrodyellow'
        break
      case Colors.BLUE:
        backgroundColor = 'lightblue'
        break
      default:
        break
    }
    return connectDragSource(
      <div
        style={Object.assign({}, style, {
          backgroundColor,
          opacity,
          cursor: forbidDrag ? 'default' : 'move',
        })}
      >
        <input
          type="checkbox"
          checked={forbidDrag}
          onChange={onToggleForbidDrag}
        />
        <small>Forbid drag</small>
        {children}
      </div>,
    )
  }
}
const SourceBox = DragSource(
  props => props.color + '',
  ColorSource,
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(SourceBoxRaw)
export default class StatefulSourceBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forbidDrag: false,
    }
  }
  render() {
    return (
      <SourceBox
        {...this.props}
        forbidDrag={this.state.forbidDrag}
        onToggleForbidDrag={() => this.handleToggleForbidDrag()}
      />
    )
  }
  handleToggleForbidDrag() {
    this.setState({
      forbidDrag: !this.state.forbidDrag,
    })
  }
}
