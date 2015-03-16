'use strict';

import React, { PropTypes, Component } from 'react';
import { DragDropMixin } from 'react-dnd';
import { DragSource } from 'dnd-core';
import { polyfillObserve, observeSource } from 'react-dnd';

class BoxDragSource extends DragSource {
  constructor(component, props) {
    this.component = component;
    this.props = props;
  }

  // TODO: the default is BAD. Fix it.
  isDragging(monitor) {
    return this.props.name === monitor.getItem().name;
  }

  beginDrag() {
    return {
      name: this.props.name
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

const propTypes = {
  name: PropTypes.string.isRequired
};

const contextTypes = {
  dnd: PropTypes.object.isRequired
};

function observe(props, context) {
  const manager = context.dnd;
  const source = new BoxDragSource(props);

  return {
    dragSource: observeSource(manager, ItemTypes.BOX, source, getDragSourceData)
  };
}

class Box extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { hasDropped: false };
  }

    render() {
      const { name } = this.props;
      const { hasDropped } = this.state;
      const { isDragging } = this.getDragState(dropType);
      const opacity = isDragging ? 0.4 : 1;

      return (
        <div {...this.dragSourceFor(dropType)}
             style={{
               ...style,
               opacity
             }}>

          {hasDropped ?
            <s>{name}</s> :
            name
          }
        </div>
      );
    }
  });

Box.propTypes = propTypes;
Box.contextTypes = contextTypes;

export default polyfillObserve(Box, observe);