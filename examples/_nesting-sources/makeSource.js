'use strict';

import React from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import Colors from './Colors';
import { DragDropMixin } from 'react-dnd';

const dragSource = {
  canDrag(component) {
    return !component.state.forbidDrag;
  },

  beginDrag() {
    return {
      item: { }
    };
  }
};

const style = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem'
};

export default function makeSource(sourceColor) {
  var Source = React.createClass({
    mixins: [DragDropMixin, LinkedStateMixin],

    statics: {
      configureDragDrop(register) {
        register(sourceColor, { dragSource });
      }
    },

    getInitialState() {
      return {
        forbidDrag: false
      };
    },

    render() {
      const { children } = this.props;
      const { isDragging } = this.getDragState(sourceColor);
      const opacity = isDragging ? 0.4 : 1;

      let backgroundColor;
      switch (sourceColor) {
      case Colors.YELLOW:
        backgroundColor = 'lightgoldenrodyellow';
        break;
      case Colors.BLUE:
        backgroundColor = 'lightblue';
        break;
      }

      return (
        <div {...this.dragSourceFor(sourceColor)}
             style={{
               ...style,
               backgroundColor,
               opacity
             }}>

          <input type='checkbox'
                 checkedLink={this.linkState('forbidDrag')}>
            Forbid drag
          </input>

          {children}
        </div>
      );
    }
  });

  return Source;
}