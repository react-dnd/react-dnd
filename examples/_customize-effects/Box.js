'use strict';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  width: '15rem'
};

class Box extends Component {
  static propTypes = {
    isDragging: PropTypes.bool.isRequired,
    dragSourceRef: PropTypes.func.isRequired,
    showCopyIcon: PropTypes.bool
  };

  render() {
    const { isDragging, dragSourceRef, showCopyIcon } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const effect = showCopyIcon ? 'copy' : 'move';

    return (
      <div style={{ ...style, opacity }}
           ref={c => dragSourceRef(c, { effect })}>
        When I am dragged over a compatible drop zone, I have '{effect}' icon.
      </div>
    );
  }
}

const boxSource = {
  beginDrag() {
    return {};
  }
};

export default configureDragDrop(Box, {
  configure: (register) =>
    register.dragSource(ItemTypes.BOX, boxSource),

  collect: (connect, monitor, dragSourceId) => ({
    dragSourceRef: connect.dragSource(dragSourceId),
    isDragging: monitor.isDragging(dragSourceId)
  })
});