/** @jsx React.DOM */
'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { DragDropMixin } = require('react-dnd');

var Dustbin = React.createClass({
  mixins: [DragDropMixin],

  configureDragDrop(registerType) {
    registerType(ItemTypes.ITEM, {
      dropTarget: {
        acceptDrop(item) {
          window.alert('You dropped ' + item.name + '!');
        }
      }
    });
  },

  render() {
    var dropState = this.getDropState(ItemTypes.ITEM),
        backgroundColor = '#222';

    if (dropState.isHovering) {
      backgroundColor = 'darkgreen';
    } else if (dropState.isDragging) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div {...this.dropTargetFor(ItemTypes.ITEM)}
           style={{
             height: '12rem',
             width: '12rem',
             color: 'white',
             backgroundColor: backgroundColor,
             padding: '2rem',
             textAlign: 'center'
           }}>

        {dropState.isHovering ?
          'Release to drop' :
          'Drag item here'
        }
      </div>
    );
  }
});

module.exports = Dustbin;