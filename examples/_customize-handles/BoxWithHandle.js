'use strict';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragDrop } from 'react-dnd';

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

const BoxSource = {
  beginDrag() {
    return {};
  }
};

@DragDrop(
  register =>
    register.dragSource(ItemTypes.BOX, BoxSource),

  boxSource => ({
    connectDragSource: boxSource.connect(),
    connectDragPreview: boxSource.connectPreview(),
    isDragging: boxSource.isDragging()
  })
)
export default class BoxWithHandle extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { isDragging, connectDragSource, connectDragPreview } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div style={{ ...style, opacity }}
           ref={connectDragPreview}>

        <div style={handleStyle}
             ref={connectDragSource} />

        Drag me by the handle
      </div>
    );
  }
}