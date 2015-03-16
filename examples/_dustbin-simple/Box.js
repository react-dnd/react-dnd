'use strict';

import React, { createClass, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, ObservePolyfill } from 'react-dnd';

class BoxDragSource extends DragSource {
  beginDrag() {
    return {
      name: this.component.props.name
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

const Box = createClass({
  mixins: [ObservePolyfill],

  propTypes: {
    name: PropTypes.string.isRequired
  },

  contextTypes: {
    dragDrop: PropTypes.object.isRequired
  },

  ctor() {
    this.dragSource = new BoxDragSource(this);
  },

  observe() {
    return {
      dragSource: this.dragSource.connectTo(this.context.dragDrop, ItemTypes.BOX)
    };
  },

  render() {
    const { isDragging, dragEventHandlers } = this.state.data.dragSource;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div {...dragEventHandlers}
           style={{ ...style, opacity }}>
        {name}
      </div>
    );
  }
});

export default Box;