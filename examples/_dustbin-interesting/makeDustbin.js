'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { DragDropMixin } = require('react-dnd'),
    { PropTypes } = React;

function makeDustbin(accepts) {
  var Dustbin = React.createClass({
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

        accepts.forEach(itemType => {
          register(itemType, {
            dropTarget: dropTarget
          });
        });
      }
    },

    render() {
      var dropStates = accepts.map(this.getDropState),
          backgroundColor = '#222';

      if (dropStates.some(s => s.isOver)) {
        backgroundColor = 'darkgreen';
      } else if (dropStates.some(s => s.isDragging)) {
        backgroundColor = 'darkkhaki';
      }

      return (
        <div {...this.dropTargetFor.apply(this, accepts)}
             style={{
               height: '12rem',
               width: '12rem',
               color: 'white',
               backgroundColor: backgroundColor,
               padding: '2rem',
               margin: '0.5rem',
               textAlign: 'center',
               float: 'left'
             }}>

          {dropStates.some(s => s.isOver) ?
            'Release to drop' :
            'This dustbin accepts: ' + accepts.join(', ')
          }

          {this.state.lastDroppedItem &&
            <p>Last dropped: {JSON.stringify(this.state.lastDroppedItem)}</p>
          }
        </div>
      );
    }
  });

  return Dustbin;
}

module.exports = makeDustbin;
