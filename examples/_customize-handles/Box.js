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
  connectDragSource: PropTypes.func.isRequired
};

class Box extends Component {
  render() {
    const { isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div style={{ ...style, opacity }}>
        <div style={handleStyle}
             ref={connectDragSource} />

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
  getHandlers(props, sourceFor) {
    return sourceFor(ItemTypes.BOX, boxSource);
  },

  getProps(connect, monitor, source) {
    return {
      connectDragSource: connect(source),
      isDragging: monitor.isDragging(source)
    };
  }
});