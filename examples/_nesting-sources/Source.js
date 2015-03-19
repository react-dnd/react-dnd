'use strict';

import React, { createClass, PropTypes } from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import Colors from './Colors';
import { DragSource, ObservePolyfill } from 'react-dnd';

class ColorDragSource extends DragSource {
  canDrag() {
    var { state } = this.component;
    return state && !state.forbidDrag || false;
  }

  beginDrag() {
    return { };
  }
}

const style = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem'
};

const Source = createClass({
  propTypes: {
    color: PropTypes.string.isRequired
  },

  contextTypes: {
    dragDrop: PropTypes.object.isRequired
  },

  mixins: [LinkedStateMixin, ObservePolyfill({
    constructor() {
      this.dragSource = new ColorDragSource(this);
    },

    observe() {
      return {
        dragSource: this.dragSource.connectTo(this.context.dragDrop, this.props.color)
      };
    }
  })],

  getInitialState() {
    return {
      forbidDrag: false
    };
  },

  render() {
    const { color, children } = this.props;
    const { isDragging, ref } = this.state.data.dragSource;
    const opacity = isDragging ? 0.4 : 1;

    let backgroundColor;
    switch (color) {
    case Colors.YELLOW:
      backgroundColor = 'lightgoldenrodyellow';
      break;
    case Colors.BLUE:
      backgroundColor = 'lightblue';
      break;
    }

    return (
      <div ref={ref}
           style={{ ...style, backgroundColor, opacity }}>
        <input type='checkbox'
               checkedLink={this.linkState('forbidDrag')}>
          Forbid drag
        </input>

        {children}
      </div>
    );
  }
});

export default Source;
