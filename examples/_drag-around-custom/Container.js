'use strict';

var React = require('react'),
    update = require('react/lib/update'),
    ItemTypes = require('./ItemTypes'),
    DraggableBox = require('./DraggableBox'),
    snapToGrid = require('./snapToGrid'),
    { PropTypes } = React,
    { DragDropMixin, DragLayerMixin } = require('react-dnd');

var styles = {
  container: {
   width: 300,
   height: 300,
   border: '1px solid black',
   position: 'relative'
  }
};

var Container = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    snapToGrid: PropTypes.bool.isRequired
  },

  getInitialState() {
    return {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' },
      }
    };
  },

  statics: {
    configureDragDrop(register, context) {
      register(ItemTypes.BOX, {
        dropTarget: {
          acceptDrop(component, item) {
            var delta = context.getCurrentOffsetDelta(),
                left = Math.round(item.left + delta.x),
                top = Math.round(item.top + delta.y);

            if (component.props.snapToGrid) {
              [left, top] = snapToGrid(left, top);
            }

            component.moveBox(item.id, left, top);
          }
        }
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
    var { boxes } = this.state;

    return (
      <div style={styles.container}
           {...this.dropTargetFor(ItemTypes.BOX)}>
        {Object
          .keys(boxes)
          .map(key => this.renderBox(boxes[key], key))
        }
      </div>
    );
  }
});

module.exports = Container;
