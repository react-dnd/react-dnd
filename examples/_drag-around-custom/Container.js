'use strict';

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import update from 'react/lib/update';
import ItemTypes from './ItemTypes';
import DraggableBox from './DraggableBox';
import snapToGrid from './snapToGrid';
import { DragDropMixin } from 'react-dnd';

const styles = {
  width: 300,
  height: 300,
  border: '1px solid black',
  position: 'relative'
};

function makeDropTarget(context) {
  return {
    acceptDrop(component, item) {
      const delta = context.getCurrentOffsetDelta();

      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      if (component.props.snapToGrid) {
        [left, top] = snapToGrid(left, top);
      }

      component.moveBox(item.id, left, top);
    }
  };
}

const Container = React.createClass({
  mixins: [DragDropMixin, PureRenderMixin],

  propTypes: {
    snapToGrid: PropTypes.bool.isRequired
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

  renderBox(item, key) {
    return (
      <DraggableBox key={key}
                    id={key}
                    {...item} />
    );
  },

  render() {
    const { boxes } = this.state;

    return (
      <div style={styles}
           {...this.dropTargetFor(ItemTypes.BOX)}>
        {Object
          .keys(boxes)
          .map(key => this.renderBox(boxes[key], key))
        }
      </div>
    );
  }
});

export default Container;