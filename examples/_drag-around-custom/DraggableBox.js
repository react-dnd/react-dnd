'use strict';

import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from './shouldPureComponentUpdate';
import ItemTypes from './ItemTypes';
import Box from './Box';
import { DragDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd/modules/backends/HTML5';

const BoxSource = {
  beginDrag(props) {
    const { id, title, left, top } = props;
    return { id, title, left, top };
  }
};

function getStyles(props) {
  const { left, top, isDragging } = props;
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: 'absolute',
    transform: transform,
    WebkitTransform: transform,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : ''
  };
}

@DragDrop(
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
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged we can hide it with CSS.
      captureDraggingState: true
    });
  }

  render() {
    const { title, isDragging, connectDragSource } = this.props;

    return (
      <div ref={connectDragSource}
           style={getStyles(this.props)}>
        <Box title={title} />
      </div>
    );
  }
}