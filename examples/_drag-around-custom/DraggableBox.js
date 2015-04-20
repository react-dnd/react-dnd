'use strict';

import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import ItemTypes from './ItemTypes';
import getEmptyImage from './getEmptyImage';
import Box from './Box';
import { configureDragDrop } from 'react-dnd';

const BoxSource = {
  beginDrag(props) {
    const { id, title, left, top } = props;
    return { id, title, left, top };
  }
};

function getStyles(props) {
  const { left, top } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform: transform,
    WebkitTransform: transform
  };
}

@configureDragDrop(
  register =>
    register.dragSource(ItemTypes.BOX, BoxSource),

  boxSource => ({
    connectDragSource: boxSource.connect(),
    connectDragPreview: boxSource.connectPreview(),
    isDragging: boxSource.isDragging()
  })
)
export default class DraggableBox {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage());
  }

  render() {
    const { title, isDragging, connectDragSource } = this.props;

    if (isDragging) {
      return null;
    }

    return (
      <div ref={connectDragSource}
           style={getStyles(this.props)}>
        <Box title={title} />
      </div>
    );
  }
}