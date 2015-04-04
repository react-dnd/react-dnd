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

const handleStyle = {
  backgroundColor: 'green',
  width: '1rem',
  height: '1rem',
  display: 'inline-block',
  marginRight: '0.5rem'
};

const propTypes = {
  isDragging: PropTypes.bool.isRequired,
  dragPreviewRef: PropTypes.func.isRequired,
  dragSourceRef: PropTypes.func.isRequired
};

class Box extends Component {
  render() {
    const { isDragging, dragSourceRef, dragPreviewRef } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div style={{ ...style, opacity }}
           ref={dragPreviewRef}>

        <div style={handleStyle}
             ref={dragSourceRef} />

        Drag me by the handle
      </div>
    );
  }
}
Box.propTypes = propTypes;

const boxSource = {
  beginDrag() {
    return {};
  }
};

export default configureDragDrop(Box, {
  configure: (register) =>
    register.dragSource(ItemTypes.BOX, boxSource),

  collect: (connect, monitor, dragSourceId) => ({
    dragPreviewRef: connect.dragSourcePreview(dragSourceId),
    dragSourceRef: connect.dragSource(dragSourceId),
    isDragging: monitor.isDragging(dragSourceId)
  })
});