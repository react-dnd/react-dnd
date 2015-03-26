'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80,
  float: 'left'
};

const propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  attachDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isDropped: PropTypes.bool.isRequired
};

class Box extends Component {
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
}
Box.propTypes = propTypes;

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  isDragging(props, monitor) {
    const item = monitor.getItem();
    return props.name === item.name;
  }
};

function registerHandlers(props, register) {
  return {
    boxSource: register.dragSource(props.type, boxSource)
  };
}

function pickProps(attach, monitor, handlers) {
  return {
    attachDragSource: (ref) => attach(handlers.boxSource, ref),
    isDragging: monitor.isDragging(handlers.boxSource)
  };
}

export default configureDragDrop(Box, registerHandlers, pickProps);