'use strict';

import React, { PropTypes, createClass } from 'react';
import { DropTarget, ObservePolyfill } from 'react-dnd';

class DustbinDropTarget extends DropTarget {
  drop(monitor) {
    this.component.setState({
      lastDroppedItem: monitor.getItem()
    });
  }
}

const style = {
  height: '12rem',
  width: '12rem',
  color: 'white',
  padding: '2rem',
  margin: '0.5rem',
  textAlign: 'center',
  float: 'left'
};

const Dustbin = createClass({
  propTypes: {
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired
  },

  contextTypes: {
    dragDrop: PropTypes.object.isRequired
  },

  mixins: [ObservePolyfill({
    constructor() {
      this.dropTarget = new DustbinDropTarget(this);
    },

    observe() {
      return {
        dropTarget: this.dropTarget.connectTo(this.context.dragDrop, this.props.accepts)
      };
    }
  })],

  getInitialState() {
    return {
      lastDroppedItem: null
    };
  },

  render() {
    const { accepts } = this.props;
    const { lastDroppedItem } = this.state;
    const { isOver, canDrop, dropEventHandlers } = this.state.data.dropTarget;

    let backgroundColor = '#222';
    if (isOver) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div {...dropEventHandlers}
           style={{ ...style, backgroundColor }}>

        {isOver ?
          'Release to drop' :
          'This dustbin accepts: ' + accepts.join(', ')
        }

        {lastDroppedItem &&
          <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
        }
      </div>
    );
  }
});

export default Dustbin;