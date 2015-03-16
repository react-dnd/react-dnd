'use strict';

import React, { PropTypes, createClass } from 'react';
import { DragSource, ObservePolyfill } from 'react-dnd';

class BoxDragSource extends DragSource {
  beginDrag() {
    return {
      name: this.component.props.name
    };
  }

  endDrag(monitor) {
    const didDrop = monitor.didDrop();

    if (didDrop) {
      this.component.setState({
        hasDropped: true
      });
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
    type: PropTypes.string.isRequired
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

  getInitialState() {
    return {
      hasDropped: false
    };
  },

  render() {
    const { name } = this.props;
    const { hasDropped } = this.state;
    const { isDragging } = this.data.dragSource;
    const opacity = isDragging ? 0.4 : 1;

    return (
      <div {...this.dragSourceFor(dropType)}
           style={{ ...style, opacity }}>
        {hasDropped ?
          <s>{name}</s> :
          name
        }
      </div>
    );
  }
});

export default Box;