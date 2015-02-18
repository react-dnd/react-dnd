'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { DragDropMixin } = require('react-dnd'),
    { PropTypes } = React;

var OuterDustbin = React.createClass({
  mixins: [DragDropMixin],

  getInitialState() {
    return {
      lastDroppedItem: null
    };
  },

  statics: {
    configureDragDrop(register) {
      var dropTarget = {
        acceptDrop(component, item, e, isHandled) {
          if (component.props.checkIsHandled && isHandled) {
            return false;
          }

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
        backgroundColor = 'rgba(0, 0, 0, .5)',
        prop = this.props.stopDeepHover ? 'isOverCurrent' : 'isHovering';

    if (dropStates.some(s => s[prop])) {
      backgroundColor = 'darkgreen';
    } else if (dropStates.some(s => s.isDragging)) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div {...this.dropTargetFor.apply(this, [ItemTypes.GLASS])}
           style={{
             border: '2px solid green',
             minHeight: '12rem',
             minWidth: '12rem',
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

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = OuterDustbin;
