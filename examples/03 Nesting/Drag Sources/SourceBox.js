import React, { Component, PropTypes } from 'react';
import Colors from './Colors';
import { DragSource } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
};

const ColorSource = {
  canDrag(props) {
    return !props.forbidDrag;
  },

  beginDrag() {
    return { };
  }
};

@DragSource(props => props.color, ColorSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class SourceBox extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    forbidDrag: PropTypes.bool.isRequired,
    onToggleForbidDrag: PropTypes.func.isRequired,
    children: PropTypes.node
  };

  render() {
    const { color, children, isDragging, connectDragSource, forbidDrag, onToggleForbidDrag } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    let backgroundColor;
    switch (color) {
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    default:
      break;
    }

    return connectDragSource(
      <div style={{
        ...style,
        backgroundColor,
        opacity,
        cursor: forbidDrag ? 'default' : 'move'
      }}>
        <input type='checkbox'
               checked={forbidDrag}
               onChange={onToggleForbidDrag} />
        <small>Forbid drag</small>

        {children}
      </div>
    );
  }
}

export default class StatefulSourceBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forbidDrag: false
    };
  }

  render() {
    return (
      <SourceBox {...this.props}
                 forbidDrag={this.state.forbidDrag}
                 onToggleForbidDrag={() => this.handleToggleForbidDrag()} />
    );
  }

  handleToggleForbidDrag() {
    this.setState({
      forbidDrag: !this.state.forbidDrag
    });
  }
}