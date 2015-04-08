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

const propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  dropTargetRef: PropTypes.func.isRequired
};

class Target extends Component {
  render() {
    const { canDrop, isOver, dropTargetRef } = this.props;
    const isActive = canDrop && isOver;

    return (
      <div ref={dropTargetRef}
           style={style}>
        {isActive ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
}
Target.propTypes = propTypes;

const boxDropTarget = {
  drop() {
  }
};

export default configureDragDrop(Target, {
  configure: (register) =>
    register.dropTarget(ItemTypes.BOX, boxDropTarget),

  collect: (connect, monitor, targetId) => ({
    dropTargetRef: connect.dropTarget(targetId),
    isOver: monitor.isOver(targetId),
    canDrop: monitor.canDrop(targetId)
  })
});