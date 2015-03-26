'use strict';

import React, { PropTypes, createClass } from 'react';
import { configureDragDrop } from 'react-dnd';

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
    attachDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isDropped: PropTypes.bool.isRequired
  },

  render() {
    const { name, isDropped, isDragging, attachDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={attachDragSource}
           style={{ ...style, opacity }}>
        {isDropped ?
          <s>{name}</s> :
          name
        }
      </div>
    );
  }
});

function createBoxSource(props) {
  return {
    beginDrag() {
      return {
        name: props.name
      };
    },

    isDragging(monitor) {
      const item = monitor.getItem();
      return props.name === item.name;
    }
  };
}

function registerHandlers(props, register) {
  return {
    boxSource: register.dragSource(props.type, createBoxSource(props))
  };
}

function pickProps(attach, monitor, handlers) {
  return {
    attachDragSource: (ref) => attach(handlers.boxSource, ref),
    isDragging: monitor.isDragging(handlers.boxSource)
  };
}

export default configureDragDrop(Box, registerHandlers, pickProps);