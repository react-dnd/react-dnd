import React, { Component, PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor: backgroundColor,
    padding: '2rem',
    paddingTop: '1rem',
    margin: '1rem',
    textAlign: 'center',
    float: 'left',
    fontSize: '1rem'
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
}))
export default class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    isOverCurrent: PropTypes.bool.isRequired,
    greedy: PropTypes.bool,
    children: PropTypes.node
  }

  constructor(props) {
    super(props);
    this.state = {
      hasDropped: false,
      hasDroppedOnChild: false
    };
  }

  render() {
    const { greedy, isOver, isOverCurrent, connectDropTarget, children } = this.props;
    const { hasDropped, hasDroppedOnChild } = this.state;

    const text = greedy ? 'greedy' : 'not greedy';
    let backgroundColor = 'rgba(0, 0, 0, .5)';

    if (isOverCurrent || isOver && greedy) {
      backgroundColor = 'darkgreen';
    }

    return connectDropTarget(
      <div style={getStyle(backgroundColor)}>
        {text}
        <br/>
        {hasDropped &&
          <span>dropped {hasDroppedOnChild && ' on child'}</span>
        }

        <div>
          {children}
        </div>
      </div>
    );
  }
}