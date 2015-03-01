'use strict';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import ItemTypes from './ItemTypes';
import getEmptyImage from './getEmptyImage';
import Box from './Box';
import { DragDropMixin, DropEffects } from 'react-dnd';

const dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: DropEffects.MOVE,
      dragPreview: getEmptyImage(),
      item: component.props
    };
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

const DraggableBox = React.createClass({
  mixins: [DragDropMixin, PureRenderMixin],

  propTypes: {
    id: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired
  },

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.BOX, { dragSource });
    }
  },

  render() {
    const { title } = this.props;
    const { isDragging } = this.getDragState(ItemTypes.BOX);

    if (isDragging) {
      return null;
    }

    return (
      <div {...this.dragSourceFor(ItemTypes.BOX)}
           style={getStyles(this.props)}>
        <Box title={title} />
      </div>
    );
  }
});

export default DraggableBox;