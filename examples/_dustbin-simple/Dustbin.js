'use strict';

import React, { PropTypes, Component } from 'react';
import ItemTypes from './ItemTypes';
import { configureDragDrop, DropTarget } from 'react-dnd';

class DustbinTarget extends DropTarget {
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

const propTypes = {
  active: PropTypes.bool.isRequired,
  hover: PropTypes.bool.isRequired,
  boxTargetProps: PropTypes.object
};

class Dustbin extends Component {
  render() {
    const { active, hover, boxTargetProps } = this.props;

    let backgroundColor = '#222';
    if (hover) {
      backgroundColor = 'darkgreen';
    } else if (active) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div {...boxTargetProps}
           style={{ ...style, backgroundColor }}>
        {hover ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
}

Dustbin.propTypes = propTypes;

export default configureDragDrop(Dustbin, {
  boxTarget: {
    for: ItemTypes.BOX,
    target: DustbinTarget
  }
}, (monitor, backend, { boxTarget }) => ({
  active: monitor.canDrop(boxTarget),
  hover: monitor.isOver(boxTarget),
  boxTargetProps: backend.getTargetProps(boxTarget)
}))