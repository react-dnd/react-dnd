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
  connectDropTarget: PropTypes.func.isRequired
};

class Dustbin extends Component {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div ref={connectDropTarget}
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

export default configureDragDrop(Dustbin, {
  getHandlers(props, register) {
    return {
      boxTarget: register.dropTarget(ItemTypes.BOX, {
        drop() {
          return { name: 'Dustbin' };
        }
      })
    };
  },

  getProps(connect, monitor, handlers) {
    return {
      connectDropTarget: connect(handlers.boxTarget),
      isOver: monitor.isOver(handlers.boxTarget),
      canDrop: monitor.canDrop(handlers.boxTarget)
    };
  }
});