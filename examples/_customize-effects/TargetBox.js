'use strict';

import React, { PropTypes, Component } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  height: '12rem',
  width: '12rem',
  color: '#222',
  padding: '2rem',
  textAlign: 'center',
  backgroundColor: '#eee'
};

const BoxTarget = {
  drop() {
  }
};

@configureDragDrop(
  register =>
    register.dropTarget(ItemTypes.BOX, BoxTarget),

  boxTarget => ({
    connectDropTarget: boxTarget.connect(),
    isOver: boxTarget.isOver(),
    canDrop: boxTarget.canDrop()
  })
)
export default class TargetBox extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    return (
      <div ref={connectDropTarget}
           style={style}>
        {isActive ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
}