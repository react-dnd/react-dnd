'use strict';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80
};

const propTypes = {
  name: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  dragSourceRef: PropTypes.func.isRequired
};

class Box extends Component {
  render() {
    const { isDragging, dragSourceRef } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={dragSourceRef}
           style={{ ...style, opacity }}>
        {name}
      </div>
    );
  }
}
Box.propTypes = propTypes;

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      window.alert(`You dropped ${item.name} into ${dropResult.name}!`);
    }
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