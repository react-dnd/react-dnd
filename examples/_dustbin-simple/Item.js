'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource } from 'dnd-core';

class ItemDragSource extends DragSource {
  constructor(component) {
    this.component = component;
  }

  beginDrag() {
    return {
      name: this.component.props.name
    };
  }

  endDrag(context) {
    const item = context.getItem();
    const dropResult = context.getDropResult();

    if (dropResult) {
      window.alert(`You dropped ${item.name} into ${dropResult.name}!`);
    }
  }
}

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80
};

const Item = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired
  },

  getInitialState() {
   return this.getDragState();
  },

  getDragState() {
    return {
      isDraggingItem: this.sourceHandle && this.props.manager.getContext().isDragging(this.sourceHandle)
    };
  },

  componentWillMount() {
    this.sourceHandle = this.props.manager.getRegistry().addSource(ItemTypes.ITEM, new ItemDragSource(this));
  },

  componentDidMount() {
    this.props.manager.getContext().addChangeListener(this.handleDragContextChange);
  },

  componentWillUnmount() {
    this.props.manager.getRegistry().removeSource(this.sourceHandle);
    this.props.manager.getContext().removeChangeListener(this.handleDragContextChange);
  },

  handleDragContextChange() {
    this.setState(this.getDragState());
  },

  render() {
    const { name } = this.props;
    const { isDraggingItem } = this.state;
    const opacity = isDraggingItem ? 0.4 : 1;

    return (
      <div {...this.props.manager.getBackend().getDraggableProps(this.sourceHandle)}
           style={{
             ...style,
             opacity
           }}>
        {name}
      </div>
    );
  }
});

export default Item;
