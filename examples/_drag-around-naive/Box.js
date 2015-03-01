'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragDropMixin, DropEffects } from 'react-dnd';

const dragSource = {
  beginDrag(component) {
    return {
      effectAllowed: DropEffects.MOVE,
      item: component.props
    };
  }
};

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  padding: '0.5rem'
};

const Box = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired
  },

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.BOX, { dragSource });
    }
  },

  render() {
    const { hideSourceOnDrag, left, top, children } = this.props;
    const { isDragging } = this.getDragState(ItemTypes.BOX);

    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return (
      <div {...this.dragSourceFor(ItemTypes.BOX)}
           style={{
            ...style,
            left,
            top
           }}>
        {children}
      </div>
    );
  }
});

export default Box;