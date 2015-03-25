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

    let backgroundColor = '#222';
    if (isOver) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div ref={attachDropTarget}
           style={{ ...style, backgroundColor }}>
        {isOver ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
});

const registerHandlers = (register) => ({
  boxTarget: register.dropTarget(ItemTypes.BOX, {
    drop() {
      return { name: 'Dustbin' };
    }
  })
});

const pickProps = (attach, monitor, handlers) => ({
  attachDropTarget: (node) => attach(handlers.boxTarget, node),
  isOver: monitor.isOver(handlers.boxTarget),
  canDrop: monitor.canDrop(handlers.boxTarget)
});

export default configureDragDrop(Dustbin, registerHandlers, pickProps);
