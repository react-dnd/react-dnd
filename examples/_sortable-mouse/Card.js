'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { PropTypes } = React,
    { MouseDragDropMixin, DropEffects } = require('react-dnd');

var Card = React.createClass({
  mixins: [MouseDragDropMixin],

  propTypes: {
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  },
  statics: {
    configureDragDrop(registerType) {
      registerType(ItemTypes.CARD, {
        dragSource: {
          beginDrag(component) {
            return {
              item: {
                id: component.props.id,
                children: <Card {...this.props}/>
              }
            };
          }
        },

        dropTarget: {
          over(component, item) {
            component.props.moveCard(item.id, this.props.id);
          }
        }
      });
    }
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
