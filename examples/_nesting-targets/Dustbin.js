'use strict';

import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';

function getStyle(backgroundColor) {
  return {
    border: '2px dashed #ddd',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor: backgroundColor,
    padding: '2rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
    textAlign: 'center',
    float: 'left'
  };
}

const boxTarget = {
  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild && !props.greedy) {
      return;
    }

    component.setState({
      hasDropped: true,
      hasDroppedOnChild: hasDroppedOnChild
    });
  }
};

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true })
  })
)
export default class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    greedy: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false
    };
  }

  render() {
    const { greedy, isOver, isOverCurrent, isDragging, connectDropTarget } = this.props;
    const { hasDropped, hasDroppedOnChild } = this.state;

    const text = greedy ? 'greedy' : 'not greedy';
    let backgroundColor = 'rgba(0, 0, 0, .5)';

    if (isOverCurrent || isOver && greedy) {
      backgroundColor = 'darkgreen';
    } else if (isDragging) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget(
      <div style={getStyle(backgroundColor)}>
        {text}

        {hasDropped &&
          <span> &middot; dropped {hasDroppedOnChild && ' on child'}</span>
        }

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}