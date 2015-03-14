'use strict';

import React, { Component } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'dnd-core';
import { polyfillObserve } from 'react-dnd';

class DustbinDropTarget extends DropTarget {
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

function getDropTargetData(monitor, backend, handle) {
  return {
    active: monitor.canDrop(handle),
    hover: monitor.isOver(handle),
    dropTargetProps: backend.getTargetProps(handle)
  };
}

class Dustbin extends Component {
  observe() {
    const manager = this.context.dnd;
    const target = new DustbinDropTarget();

    return {
      dropTarget: manager.observeTarget(ItemTypes.BOX, target, getDropTargetData)
    };
  }

  render() {
    const { active, hover, dropTargetProps } = this.data.dropTarget;

    let backgroundColor = '#222';
    if (hover) {
      backgroundColor = 'darkgreen';
    } else if (active) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div {...dropTargetProps}
           style={{ ...style, backgroundColor }}>
        {hover ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
}

export default polyfillObserve(Dustbin);