'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { PropTypes } = React,
    { DragDropMixin, DropEffects } = require('react-dnd');

var Box = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    id: PropTypes.any.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hideSourceOnDrag: PropTypes.bool.isRequired
  },

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.BOX, {
        dragSource: {
          beginDrag(component, e) {
            return {
              effectAllowed: DropEffects.MOVE,
              item: {
                id: component.props.id,
                startLeft: component.props.left,
                startTop: component.props.top,
                startPageX: e.pageX,
                startPageY: e.pageY
              }
            };
          }
        }
      });
    }
  },

  render() {
    var { isDragging } = this.getDragState(ItemTypes.BOX),
        { hideSourceOnDrag } = this.props;

    if (isDragging && hideSourceOnDrag) {
      return null;
    }

    return (
      <div {...this.dragSourceFor(ItemTypes.BOX)}
           style={{
            position: 'absolute',
            left: this.props.left,
            top: this.props.top,
            border: '1px dashed gray',
            padding: '0.5rem'
           }}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Box;
