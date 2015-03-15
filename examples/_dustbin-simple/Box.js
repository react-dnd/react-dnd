'use strict';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'dnd-core';
import { polyfillObserve, observeSource } from 'react-dnd';

class BoxDragSource extends DragSource {
  constructor(props) {
    this.props = props;
  }

  isDragging(monitor) {
    return this.props.name === monitor.getItem().name;
  }

  beginDrag() {
    return {
      name: this.props.name
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
  name: PropTypes.string.isRequired
};

function getDragSourceData(monitor, backend, handle) {
  return {
    isDragging: monitor.isDragging(handle),
    dragSourceProps: backend.getSourceProps(handle)
  };
}

function observe(props, context) {
  const manager = context.dnd;
  const source = new BoxDragSource(props);

  return {
    dragSource: observeSource(manager, ItemTypes.BOX, source, getDragSourceData)
  };
}

class Box extends Component {
  render() {
    const { isDragging, dragSourceProps } = this.props.data.dragSource;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div {...dragSourceProps}
           style={{ ...style, opacity }}>
        {name}
      </div>
    );
  }
}

Box.propTypes = propTypes;
Box.contextTypes = {
  dnd: PropTypes.object.isRequired
};

export default polyfillObserve(Box, observe);