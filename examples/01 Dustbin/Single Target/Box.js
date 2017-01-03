import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left'
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      window.alert( // eslint-disable-line no-alert
        `You dropped ${item.name} into ${dropResult.name}!`
      );
    }
  }
};

// @DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging()
// }))
// export default class Box extends Component {
//   static propTypes = {
//     connectDragSource: PropTypes.func.isRequired,
//     isDragging: PropTypes.bool.isRequired,
//     name: PropTypes.string.isRequired
//   };

//   render() {
//     const { isDragging, connectDragSource } = this.props;
//     const { name } = this.props;
//     const opacity = isDragging ? 0.4 : 1;

//     return (
//       connectDragSource(
//         <div style={{ ...style, opacity }}>
//           {name}
//         </div>
//       )
//     );
//   }
// }

function draggable(WrappedComponent) {
  class Draggable extends Component {
    render() {
      const { connectDragSource, ...rest } = this.props;
      return <WrappedComponent {...rest} ref={ (instance) => connectDragSource(findDOMNode(instance)) }/>
    }
  }

  return DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(Draggable)
}

// this works:
// class Box extends Component {
//   render() {
//     const { isDragging } = this.props;
//     const { name } = this.props;
//     const opacity = isDragging ? 0.4 : 1;
//     return (
//       <div style={{ ...style, opacity }}>
//         {name}
//       </div>
//     );
//   }
// }

// this doesn't:
const Box = (props) => {
  const { isDragging } = props;
  const { name } = props;
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div style={{ ...style, opacity }}>
      {name}
    </div>
  );
}

export default draggable(Box)
