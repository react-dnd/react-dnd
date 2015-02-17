'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { DragDropMixin } = require('react-dnd'),
    { PropTypes } = React;

var InnerDustbin = React.createClass({
  mixins: [DragDropMixin],

  getInitialState() {
    return {
      lastDroppedItem: null
    };
  },

  statics: {
    configureDragDrop(register) {
      var dropTarget = {
        acceptDrop(component, item) {
          component.setState({
            lastDroppedItem: item
          });
        }
      };

      register(ItemTypes.GLASS, {
        dropTarget: dropTarget
      });
    }
  },

  render() {
    var dropStates = [ItemTypes.GLASS].map(this.getDropState),
        backgroundColor = 'rgba(0, 0, 0, 1)';

    if (dropStates.some(s => s.isHovering)) {
      backgroundColor = 'darkgreen';
    } else if (dropStates.some(s => s.isDragging)) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div {...this.dropTargetFor.apply(this, [ItemTypes.GLASS])}
           style={{
             border: '2px solid green',
             height: '12rem',
             width: '12rem',
             color: 'white',
             backgroundColor: backgroundColor,
             padding: '2rem',
             margin: '0.5rem',
             textAlign: 'center',
             float: 'left'
           }}>

        {dropStates.some(s => s.isHovering) ?
          'Release to drop' :
          'This dustbin accepts: ' + [ItemTypes.GLASS].join(', ')
        }

        {this.state.lastDroppedItem &&
          <p>Last dropped: {JSON.stringify(this.state.lastDroppedItem)}</p>
        }
      </div>
    );
  }
});

module.exports = InnerDustbin;
