'use strict';

import React, { PropTypes, createClass } from 'react';
import { DragSource, ObservePolyfill } from 'react-dnd';

class BoxDragSource extends DragSource {
  beginDrag() {
    return {
      name: this.component.props.name
    };
  }

  isDragging(monitor) {
    const item = monitor.getItem();
    return this.component.props.name === item.name;
  }

  endDrag(monitor) {
    if (monitor.didDrop()) {
      const item = monitor.getItem();
      this.component.props.onDrop(item.name);
    }
  }
}

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80,
  float: 'left'
};

const Box = createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired
  },

  contextTypes: {
    dragDrop: PropTypes.object.isRequired
  },

  mixins: [ObservePolyfill({
    constructor() {
      this.dragSource = new BoxDragSource(this);
    },

    observe() {
      return {
        dragSource: this.dragSource.connectTo(this.context.dragDrop, this.props.type)
      };
    }
  })],

  render() {
    const { name, isDropped } = this.props;
    const { isDragging, ref } = this.state.data.dragSource;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={ref}
           style={{ ...style, opacity }}>
        {isDropped ?
          <s>{name}</s> :
          name
        }
      </div>
    );
  }
});

export default Box;