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
  connectDropTarget: PropTypes.func.isRequired,
  lastDroppedItem: PropTypes.object,
  onDrop: PropTypes.func.isRequired
};

class Dustbin extends Component {
  render() {
    const { accepts, isOver, canDrop, connectDropTarget, lastDroppedItem } = this.props;
    const isActive = isOver && canDrop;

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
  getHandlers(props, sourceFor, targetFor) {
    return targetFor(props.accepts, {
      drop(props, monitor) {
        props.onDrop(monitor.getItem());
      }
    });
  },

  getProps(connect, monitor, target) {
    return {
      isOver: monitor.isOver(target),
      canDrop: monitor.canDrop(target),
      connectDropTarget: connect(target)
    };
  }
});