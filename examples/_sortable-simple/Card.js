'use strict';

import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import { DragSource, DropTarget, ObservePolyfill } from 'react-dnd';

class CardDragSource extends DragSource {
  beginDrag() {
    return {
      item: {
        id: this.component.props.id
      }
    };
  }
}

class CardDropTarget extends DropTarget {
  over(monitor) {
    const item = monitor.getItem();
    this.component.props.moveCard(item.id, this.component.props.id);
  }
}

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem'
};

const Card = React.createClass({
  contextTypes: {
    dragDrop: PropTypes.object.isRequired
  },

  mixins: [ObservePolyfill({
    constructor() {
      this.dragSource = new CardDragSource(this);
      //this.dropTarget = new CardDropTarget(this);
    },

    observe() {
      return {
        dragSource: this.dragSource.connectTo(this.context.dragDrop, ItemTypes.CARD),
        //dropTarget: this.dropTarget.connectTo(this.context.dragDrop, ItemTypes.CARD)
      };
    }
  })],

  propTypes: {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  },

  render() {
    const { text } = this.props;

    // TODO: refs totally suck here.
    // Need to rethink this.

    const { isDragging, ref: sourceRef } = this.state.data.dragSource;
    //const { ref: targetRef } = this.state.data.dropTarget;
    const opacity = isDragging ? 0 : 1;

    return (
      <div ref={sourceRef}
           style={{ ...style, opacity }}>
        {text}
      </div>
    );
  }
});

export default Card;