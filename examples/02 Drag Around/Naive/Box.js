import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import ItemTypes from './ItemTypes';
import { DragSource } from 'react-dnd';

const style = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
  width: 170,
  height: 45,
};

const boxSource = {
  beginDrag(props, monitor, component) {
    const { id, left, top } = props;
    const { width, height } = findDOMNode(component).getBoundingClientRect();
    return { id, left, top, width, height };
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    children: PropTypes.node
  };

  render() {
    const { left, top, connectDragSource, connectDragPreview, children } = this.props;

    // We use empty, invisible DIV as drag preview. We don't need real drag preview,
    // since we move box instantly.
    const fakeDragPreview = <div style={{position: 'absolute', zIndex: -1, top: -1000}}>&nbsp;</div>;

    return connectDragSource(
      <div style={{ ...style, left, top }}>
        {connectDragPreview(fakeDragPreview)}
        {children}
      </div>
    );
  }
}
