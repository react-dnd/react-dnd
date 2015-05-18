import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'react-dnd';

const style = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem',
  backgroundColor: 'white',
  cursor: 'move'
};

const boxSource = {
  beginDrag() {
    return {};
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  render() {
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div style={style}>
        Drag me
      </div>
    );
  }
}