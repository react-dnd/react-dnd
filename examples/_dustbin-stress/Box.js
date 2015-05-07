'use strict';

import React, { PropTypes, Component } from 'react';
import { DragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80,
  float: 'left'
};

const BoxSource = {
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

@DragDrop(
  (register, props) =>
    register.dragSource(props.type, BoxSource),

  boxSource => ({
    connectDragSource: boxSource.connect(),
    isDragging: boxSource.isDragging()
  })
)
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired
  };

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