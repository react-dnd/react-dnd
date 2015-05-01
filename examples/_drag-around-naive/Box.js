'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  padding: '0.5rem'
};

const BoxSource = {
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top };
  }
};

@configureDragDrop(
  register =>
    register.dragSource(ItemTypes.BOX, BoxSource),

  boxSource => ({
    connectDragSource: boxSource.connect(),
    isDragging: boxSource.isDragging()
  })
)
export default class Box {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired
  };

  render() {
    const { hideSourceOnDrag, left, top, connectDragSource, isDragging, children } = this.props;
    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return (
      <div ref={connectDragSource}
           style={{ ...style, left, top }}>
        {children}
      </div>
    );
  }
}