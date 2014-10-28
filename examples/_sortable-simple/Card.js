/** @jsx React.DOM */
'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { PropTypes } = React,
    { DragDropMixin } = require('react-dnd');

var Card = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  },

  configureDragDrop(registerType) {
    registerType(ItemTypes.CARD, {
      dragSource: {
        beginDrag() {
          return {
            item: {
              id: this.props.id
            }
          };
        }
      },

      dropTarget: {
        over(item) {
          this.props.moveCard(item.id, this.props.id);
        }
      }
    });
  },

  render() {
    var { isDragging } = this.getDragState(ItemTypes.CARD);

    return (
      <div {...this.dragSourceFor(ItemTypes.CARD)}
           {...this.dropTargetFor(ItemTypes.CARD)}
           style={{
             border: '1px dashed gray',
             backgroundColor: 'white',
             padding: '0.5rem',
             margin: '0.5rem',
             opacity: isDragging ? 0 : 1
           }}>
        {this.props.text}
      </div>
    );
  }
});

module.exports = Card;