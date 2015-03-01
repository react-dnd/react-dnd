'use strict';

import React, { PropTypes } from 'react';
import update from 'react/lib/update';
import ItemTypes from './ItemTypes';
import Box from './Box';
import { DragDropMixin } from'react-dnd';

function makeDropTarget(context) {
  return {
    acceptDrop(component, item) {
      const delta = context.getCurrentOffsetDelta();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      component.moveBox(item.id, left, top);
    }
  };
}

const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative'
};

const Container = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    hideSourceOnDrag: PropTypes.bool.isRequired
  },

  getInitialState() {
    return {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' }
      }
    };
  },

  statics: {
    configureDragDrop(register, context) {
      register(ItemTypes.BOX, {
        dropTarget: makeDropTarget(context)
      });
    }
  },

  moveBox(id, left, top) {
    this.setState(update(this.state, {
      boxes: {
        [id]: {
          $merge: {
            left: left,
            top: top
          }
        }
      }
    }));
  },

  render() {
    const { hideSourceOnDrag } = this.props;
    const { boxes} = this.state;

    return (
      <div {...this.dropTargetFor(ItemTypes.BOX)}
           style={styles}>

        {Object.keys(boxes).map(key => {
          const { left, top, title } = boxes[key];

          return (
            <Box key={key}
                 id={key}
                 left={left}
                 top={top}
                 hideSourceOnDrag={hideSourceOnDrag}>
              {title}
            </Box>
          );
        })}

      </div>
    );
  }
});

export default Container;