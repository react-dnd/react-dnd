'use strict';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import ItemTypes from './ItemTypes';
import BoxDragPreview from './BoxDragPreview';
import snapToGrid from './snapToGrid';
import { DragLayerMixin } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props, state) {
  let { x, y } = state.currentOffset;

  if (props.snapToGrid) {
    x -= state.initialOffset.x;
    y -= state.initialOffset.y;

    [x, y] = snapToGrid(x, y);

    x += state.initialOffset.x;
    y += state.initialOffset.y;
  }

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

const DragLayer = React.createClass({
  mixins: [DragLayerMixin, PureRenderMixin],

  propTypes: {
    snapToGrid: PropTypes.bool.isRequired
  },

  renderItem(type, item) {
    switch (type) {
    case ItemTypes.BOX:
      return (
        <BoxDragPreview title={item.title} />
      );
    }
  },

  render() {
    const {
      draggedItem,
      draggedItemType,
      isDragging
    } = this.getDragLayerState();

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props, this.state)}>
          {this.renderItem(draggedItemType, draggedItem)}
        </div>
      </div>
    );
  }
});

export default DragLayer;