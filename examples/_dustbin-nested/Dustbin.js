'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    { DragDropMixin } = require('react-dnd'),
    { PropTypes } = React;

var Dustbin = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    greedy: PropTypes.bool
  },

  getInitialState() {
    return {
      didDrop: null,
      didDropOnCurrent: null
    };
  },

  statics: {
    configureDragDrop(register) {
      var dropTarget = {
        enter() {
          // TODO
        },

        over() {
          // TODO
        },

        leave() {
          // TODO
        },

        acceptDrop(component, item, e, isHandled) {
          if (!component.props.greedy && isHandled) {
            return;
          }

          component.setState({
            didDrop: true,
            didDropOnCurrent: !isHandled
          });
        }
      };

      register(ItemTypes.BOX, {
        dropTarget: dropTarget
      });
    }
  },

  render() {
    var { isOver, isOverCurrent, isDragging } = this.getDropState(ItemTypes.BOX),
        { greedy } = this.props,
        { didDrop, didDropOnCurrent } = this.state,
        backgroundColor = 'rgba(0, 0, 0, .5)',
        text = greedy ? 'greedy' : 'lazy';

    if (isOverCurrent || isOver && greedy) {
      backgroundColor = 'darkgreen';
      text = greedy ? 'active (greedy)' : 'active (lazy)';
    } else if (isDragging) {
      backgroundColor = 'darkkhaki';
      text = 'dragging';
    }

    return (
      <div {...this.dropTargetFor(ItemTypes.BOX)}
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

        {text}

        {didDrop &&
          <span> &middot; did drop {didDropOnCurrent && ' (on current)'}</span>
        }

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Dustbin;
