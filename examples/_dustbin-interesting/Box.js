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
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isDropped: PropTypes.bool.isRequired
};

class Box extends Component {
  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={connectDragSource}
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

export default configureDragDrop(Box, {
  getHandlers(props, register) {
    return {
      boxSource: register.dragSource(props.type, boxSource)
    };
  },

  getProps(connect, monitor, handlers) {
    return {
      connectDragSource: connect(handlers.boxSource),
      isDragging: monitor.isDragging(handlers.boxSource)
    };
  }
});