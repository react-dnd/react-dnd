'use strict';

import React, { PropTypes, createClass } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  textAlign: 'center'
};

const Dustbin = createClass({
  propTypes: {
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    attachDropTarget: PropTypes.func.isRequired
  },

  render() {
    const { canDrop, isOver, attachDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div ref={attachDropTarget}
           style={{ ...style, backgroundColor }}>
        {isActive ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
});

const boxTarget = {
  drop() {
    return { name: 'Dustbin' };
  }
};

function registerHandlers(props, register) {
  return {
    boxTarget: register.dropTarget(ItemTypes.BOX, boxTarget)
  };
}

function pickProps(attach, monitor, handlers) {
  return {
    attachDropTarget: (ref) => attach(handlers.boxTarget, ref),
    isOver: monitor.isOver(handlers.boxTarget),
    canDrop: monitor.canDrop(handlers.boxTarget)
  };
}

export default configureDragDrop(Dustbin, registerHandlers, pickProps);
