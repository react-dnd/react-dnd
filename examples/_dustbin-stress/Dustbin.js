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

const dropTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  }
};

export default configureDragDrop(Dustbin, {
  configure: (register, props) =>
    register.dropTarget(props.accepts, dropTarget),

  collect: (connect, monitor, dropTargetId) => ({
    isOver: monitor.isOver(dropTargetId),
    canDrop: monitor.canDrop(dropTargetId),
    connectDropTarget: connect.dropTarget(dropTargetId)
  })
});