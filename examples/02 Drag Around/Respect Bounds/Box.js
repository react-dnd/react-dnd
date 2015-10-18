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

const previewStyle = {
  position: 'absolute',
  backgroundColor: '#000',
  opacity: 0.8,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  color: 'white',
  padding: '0.5rem 1rem',
};

const boxSource = {
  beginDrag(props, monitor, component) {
    const { id, left, top, respectBounds } = props;
    const { width, height } = findDOMNode(component).getBoundingClientRect();
    return { id, left, top, width, height, respectBounds };
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragPreview: connect.dragPreview(),
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    respectBounds: PropTypes.bool,
    children: PropTypes.node
  };

  render() {
    const { left, top, connectDragSource, connectDragPreview, isDragging, children, respectBounds } = this.props;
    return connectDragSource(
      <div style={{ ...style, left, top }}>
        {connectDragPreview(<div style={{position: 'absolute', zIndex: -1, top: -1000}}>&nbsp;</div>)}
        <div style={{display: isDragging ? 'block' : 'none', ...previewStyle}}>
          {respectBounds ? 'I won\'t leave you' : 'I don\'t care'}
        </div>
        {children}
      </div>
    );
  }
}
