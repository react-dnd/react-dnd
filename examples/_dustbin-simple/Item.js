'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragDropMixin } from 'react-dnd';

const itemDragSource = {
  beginDrag(component) {
    return {
      item: {
        name: component.props.name
      }
    };
  }
};

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80
};

const Item = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    name: PropTypes.string.isRequired
  },

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.ITEM, {
        dragSource: itemDragSource
      });
    }
  },

  render() {
    const { name } = this.props;
    const { isDragging } = this.getDragState(ItemTypes.ITEM);
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div {...this.dragSourceFor(ItemTypes.ITEM)}
           style={{
             ...style,
             opacity
           }}>
        {name}
      </div>
    );
  }
});

export default Item;