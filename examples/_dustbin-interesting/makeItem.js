'use strict';

import React, { PropTypes } from 'react';
import { DragDropMixin } from 'react-dnd';

const dragSource = {
  beginDrag(component) {
    return {
      item: {
        name: component.props.name
      }
    };
  },

  endDrag(component, effect) {
    if (effect) {
      component.setState({
        hasDropped: true
      });
    }
  }
};

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem',
  margin: '0.5rem',
  maxWidth: 80,
  float: 'left'
};

export default function makeItem(dropType) {
  const Item = React.createClass({
    mixins: [DragDropMixin],

    propTypes: {
      name: PropTypes.string.isRequired
    },

    getInitialState() {
      return {
        hasDropped: false
      };
    },

    statics: {
      configureDragDrop(register) {
        register(dropType, { dragSource });
      }
    },

    render() {
      const { name } = this.props;
      const { hasDropped } = this.state;
      const { isDragging } = this.getDragState(dropType);
      const opacity = isDragging ? 0.4 : 1;

      return (
        <div {...this.dragSourceFor(dropType)}
             style={{
               ...style,
               opacity
             }}>

          {hasDropped ?
            <s>{name}</s> :
            name
          }
        </div>
      );
    }
  });

  return Item;
}