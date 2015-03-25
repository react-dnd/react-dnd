'use strict';

import React, { createClass, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80
};

const Box = createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    attachDragSource: PropTypes.bool.isRequired
  },

  render() {
    const { isDragging, ref } = this.state.data.dragSource;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div ref={ref}
           style={{ ...style, opacity }}>
        {name}
      </div>
    );
  }
});

const registerHandlers = (register, props) => ({
  boxSource: register.dragSource(ItemTypes.BOX, {
    beginDrag() {
      return {
        name: props.name
      };
    },

    endDrag(monitor) {
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        window.alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    }
  })
});

const pickProps = (attach, monitor, { boxSource }) => ({
  attachDragSource: (node) => attach(boxSource, node),
  isOver: monitor.isOver(boxSource),
  canDrop: monitor.canDrop(boxSource)
});

export default configureDragDrop(Box, registerHandlers, pickProps);