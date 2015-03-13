'use strict';

import React, { Component } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget} from 'dnd-core';

class ItemDropTarget extends DropTarget {
  drop() {
    return { name: 'Dustbin' };
  }
}

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  textAlign: 'center'
};

export default class Dustbin extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDropState();
  }

  getDropState() {
    const context = this.props.manager.getContext();
    return {
      isHovering: this.targetHandle && context.isOver(this.targetHandle),
      isDragging: context.isDragging()
    };
  }

  componentWillMount() {
    console.log('test')
    this.targetHandle = this.props.manager.getRegistry().addTarget(ItemTypes.ITEM, new ItemDropTarget());
  }

  componentDidMount() {
    this._changeListener = this.props.manager.getContext().addChangeListener(() => this.handleDragContextChange());
  }

  componentWillUnmount() {
    this.props.manager.getRegistry().removeTarget(this.targetHandle);
    this.props.manager.getContext().removeChangeListener(this._changeListener);
  }

  handleDragContextChange() {
    this.setState(this.getDropState());
  }

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
}
