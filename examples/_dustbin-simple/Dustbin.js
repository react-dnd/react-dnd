'use strict';

import React, { PropTypes, Component } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  textAlign: 'center'
};

const propTypes = {
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  dropTargetRef: PropTypes.func.isRequired
};

class Dustbin extends Component {
  render() {
    const { canDrop, isOver, dropTargetRef } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div ref={dropTargetRef}
           style={{ ...style, backgroundColor }}>
        {isActive ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
}
Dustbin.propTypes = propTypes;

const boxDropTarget = {
  drop() {
    return { name: 'Dustbin' };
  }
};

export default configureDragDrop(Dustbin, {
  configure: (register) =>
    register.dropTarget(ItemTypes.BOX, boxDropTarget),

  collect: (connect, monitor, targetId) => ({
    dropTargetRef: connect.dropTarget(targetId),
    isOver: monitor.isOver(targetId),
    canDrop: monitor.canDrop(targetId)
  })
});