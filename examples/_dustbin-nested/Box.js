'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { PropTypes } = React,
    { DragDropMixin, DropEffects } = require('react-dnd');

var Box = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.BOX, {
        dragSource: {
          beginDrag(component) {
            return {
              item: {}
            };
          }
        }
      });
    }
  },

  render() {
    var { isDragging } = this.getDragState(ItemTypes.BOX);

    return (
      <div {...this.dragSourceFor(ItemTypes.BOX)}
           style={{
            display: 'inline-block',
            border: '1px dashed gray',
            padding: '0.5rem',
            backgroundColor: 'white'
           }}>
        Drag me
      </div>
    );
  }
});

module.exports = Box;
