'use strict';

import React from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget} from 'dnd-core';

class ItemDropTarget extends DropTarget {
  constructor(component) {
    this.component = component;
  }

  drop() {
    return {name: 'Dustbin'};
  }
}

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  textAlign: 'center'
};

const Dustbin = React.createClass({

  getInitialState() {
   return this.getDropState();
  },

  getDropState() {
    const context = this.props.manager.getContext();
    
    return {
      isHovering: this.targetHandle && context.isOver(this.targetHandle),
      isDragging: context.isDragging()
    };
  },

  componentWillMount() {
    this.targetHandle = this.props.manager.getRegistry().addTarget(ItemTypes.ITEM, new ItemDropTarget(this));
  },

  componentDidMount() {
    this.props.manager.getContext().addChangeListener(this.handleDragContextChange);
  },

  componentWillUnmount() {
    this.props.manager.getRegistry().removeTarget(this.targetHandle);
    this.props.manager.getContext().removeChangeListener(this.handleDragContextChange);
  },

  handleDragContextChange() {
    this.setState(this.getDropState());
  },

  render() {
    let backgroundColor = '#222';
    if (this.state.isHovering) {
      backgroundColor = 'darkgreen';
    } else if (this.state.isDragging) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div {...this.props.manager.getBackend().getDroppableProps(this.targetHandle)}
           style={{
             ...style,
             backgroundColor
           }}>

        {this.state.isHovering ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
});

export default Dustbin;
