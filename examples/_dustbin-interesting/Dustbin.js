'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDrop } from 'react-dnd';

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  margin: '0.5rem',
  textAlign: 'center',
  float: 'left'
};

const propTypes = {
  accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  attachDropTarget: PropTypes.func.isRequired,
  lastDroppedItem: PropTypes.object,
  onDrop: PropTypes.func.isRequired
};

class Dustbin extends Component {
  render() {
    const { accepts, isOver, canDrop, attachDropTarget, lastDroppedItem } = this.props;
    const isActive = isOver && canDrop;

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
          'This dustbin accepts: ' + accepts.join(', ')
        }

        {lastDroppedItem &&
          <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
        }
      </div>
    );
  }
}
Dustbin.propTypes = propTypes;

export default configureDragDrop(Dustbin, {
  getHandlers(props, register) {
    return {
      dustbinTarget: register.dropTarget(props.accepts, {
        drop(props, monitor) {
          props.onDrop(monitor.getItem());
        }
      })
    };
  },

  getProps(attach, monitor, handlers) {
    return {
      isOver: monitor.isOver(handlers.dustbinTarget),
      canDrop: monitor.canDrop(handlers.dustbinTarget),
      attachDropTarget: ref => attach(handlers.dustbinTarget, ref)
    };
  }
});