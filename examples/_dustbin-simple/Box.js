'use strict';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'dnd-core';
import { polyfillObserve } from 'react-dnd';

class BoxDragSource extends DragSource {
  constructor(component, props) {
    this.component = component;
    this.props = props;
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

class Box extends Component {
  observe(props) {
    const manager = this.context.dnd;
    const source = new BoxDragSource(this, props);

    return {
      dragSource: manager.observeSource(ItemTypes.BOX, source, getDragSourceData)
    };
  }

  render() {
    const { isDragging, dragSourceProps } = this.data.dragSource;
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

export default polyfillObserve(Box);