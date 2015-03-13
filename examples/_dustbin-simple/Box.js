'use strict';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, configureDragDrop } from 'react-dnd';

class BoxSource extends DragSource {
  beginDrag() {
    return {
      name: this.getProps().name
    };
  }

  endDrag(monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      window.alert(`You dropped ${item.name} into ${dropResult.name}!`);
    }
  }
}

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80
};

const propTypes = {
  name: PropTypes.string.isRequired,
  isBeingDragged: PropTypes.bool.isRequired,
  boxSourceProps: PropTypes.object
};

class Box extends Component {
  render() {
    const { name, isBeingDragged, boxSourceProps } = this.props;
    const opacity = isBeingDragged ? 0.4 : 1;

    return (
      <div {...boxSourceProps}
           style={{ ...style, opacity }}>
        {name}
      </div>
    );
  }
}

Box.propTypes = propTypes;

export default configureDragDrop(Box, {
  boxSource: {
    for: ItemTypes.BOX,
    source: BoxSource
  }
}, (monitor, backend, { boxSource }) => ({
  isBeingDragged: monitor.isDragging(boxSource),
  boxSourceProps: backend.getSourceProps(boxSource)
}))