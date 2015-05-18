import React, { PropTypes, Component } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';

const style = {
  border: '1px solid gray',
  height: '15rem',
  width: '15rem',
  padding: '2rem',
  textAlign: 'center'
};

const boxTarget = {
  drop() {
  }
};

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class TargetBox extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
      <div style={style}>
        {isActive ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
}