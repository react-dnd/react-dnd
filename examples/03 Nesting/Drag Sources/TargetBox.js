import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import Colors from './Colors';

const style = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center'
};

const ColorTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItemType());
  }
};

@DropTarget([Colors.YELLOW, Colors.BLUE], ColorTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  draggingColor: monitor.getItemType()
}))
class TargetBox extends Component {
  static propTypes = {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    draggingColor: PropTypes.string,
    lastDroppedColor: PropTypes.string,
    connectDropTarget: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired
  };

  render() {
    const { canDrop, isOver, draggingColor, lastDroppedColor, connectDropTarget } = this.props;
    const opacity = isOver ? 1 : 0.7;

    let backgroundColor = '#fff';
    switch (draggingColor) {
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    default:
      break;
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor, opacity }}>

        <p>Drop here.</p>

        {!canDrop && lastDroppedColor &&
          <p>Last dropped: {lastDroppedColor}</p>
        }
      </div>
    );
  }
}

export default class StatefulTargetBox extends Component {
  constructor(props) {
    super(props);
    this.state = { lastDroppedColor: null };
  }

  render() {
    return (
      <TargetBox {...this.props}
                 lastDroppedColor={this.state.lastDroppedColor}
                 onDrop={color => this.handleDrop(color)} />
    );
  }

  handleDrop(color) {
    this.setState({
      lastDroppedColor: color
    });
  }
}