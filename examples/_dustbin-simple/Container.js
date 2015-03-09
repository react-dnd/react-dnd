'use strict';

import React from 'react';
import Dustbin from './Dustbin';
import Item from './Item';
import { DragSource, DragDropManager } from 'dnd-core';

class HTML5Backend {
  constructor(actions) {
    this.actions = actions;
  }

  getDraggableProps(sourceHandle) {
    return {
      draggable: true,
      onDragStart: (e) => this.handleDragStart(e, sourceHandle),
      onDragEnd: (e) => this.handleDragEnd(e)
    };
  }

  getDroppableProps(targetHandle) {
    return {
      onDragEnter: (e) => this.handleDragEnter(e, targetHandle),
      onDragOver: (e) => this.handleDragOver(e, targetHandle),
      onDragLeave: (e) => this.handleDragLeave(e, targetHandle),
      onDrop:  (e) => this.handleDrop(e, targetHandle),
    };
  }

  handleDragOver(e, targetHandle) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the
  }

  handleDragEnter(e, targetHandle) {
    this.actions.enter(targetHandle);
  }

  handleDragLeave(e, targetHandle) {
    this.actions.leave(targetHandle);
  }

  handleDrop(e) {
    this.actions.drop();
  }

  handleDragStart(e, sourceHandle) {
    const { nativeEvent: { dataTransfer, target } } = e;

    this.actions.beginDrag(sourceHandle);
  }

  handleDragEnd() {
    this.actions.endDrag();
  }
}

const manager = new DragDropManager(HTML5Backend);

const Container = React.createClass({
  render() {
    return (
      <div>
        <Dustbin manager={manager} />
        <div style={{ marginTop: '2rem' }}>
          <Item manager={manager} name='Glass' />
          <Item manager={manager} name='Banana' />
          <Item manager={manager} name='Paper' />
        </div>
      </div>
    );
  }
});

export default Container;
