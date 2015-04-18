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

const BoxSource = {
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

@configureDragDrop(
  register => register.dragSource(ItemTypes.BOX, BoxSource),
  boxSource => ({
    dragSourceRef: boxSource.connect(),
    isDragging: boxSource.isDragging()
  })
)
export default class Box extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    dragSourceRef: PropTypes.func.isRequired
  };

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