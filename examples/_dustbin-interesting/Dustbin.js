'use strict';

import React, { PropTypes, createClass } from 'react';
import { DropTarget, ObservePolyfill } from 'react-dnd';

class DustbinDropTarget extends DropTarget {
  drop(monitor) {
    this.component.setState({
      lastDroppedItem: monitor.getItem()
    });
  }
};

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
  }

  mixins: [ObservePolyfill({
    constructor() {
      this.dropTarget = new DustbinDropTarget(this);
    },

    observe() {
      const observables = {};
      this.props.accepts.forEach(type =>
        observables[type + 'DropTarget'] = this.dropTarget.connectTo(this.context.dragDrop, this.props.type)
      )

      return observables;
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
    const dropTargetStates = accepts.map(type => this.state.data[type + 'DropTarget']);

    let backgroundColor = '#222';
    if (dropTargetStates.some(s => s.isOver)) {
      backgroundColor = 'darkgreen';
    } else if (dropTargetStates.some(s => s.canDrop)) {
      backgroundColor = 'darkkhaki';
    }

    // TODO.. target should support multi types.. right??

    return (
      <div 
           style={{ ...style, backgroundColor }}>

        {dropStates.some(s => s.isHovering) ?
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