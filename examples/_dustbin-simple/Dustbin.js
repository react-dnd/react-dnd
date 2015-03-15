'use strict';

import React, { PropTypes, Component } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'dnd-core';
import { polyfillObserve, observeTarget } from 'react-dnd';

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

function observe(props, context) {
  const manager = context.dnd;
  const target = new DustbinDropTarget();

  return {
    dropTarget: observeTarget(manager, ItemTypes.BOX, target, getDropTargetData)
  };
}

class Dustbin extends Component {
  render() {
    const { active, hover, dropTargetProps } = this.props.data.dropTarget;

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

Dustbin.contextTypes = {
  dnd: PropTypes.object.isRequired
};

export default polyfillObserve(Dustbin, observe);