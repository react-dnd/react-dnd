'use strict';

var React = require('react'),
    Colors = require('./Colors'),
    LinkedStateMixin = require('react/lib/LinkedStateMixin'),
    { DragDropMixin } = require('react-dnd');

function makeSource(sourceColor) {
  var dragSource = {
    canDrag(component) {
      return !component.state.forbidDrag;
    },

    beginDrag() {
      return {
        item: { }
      };
    }
  };

  var Source = React.createClass({
    mixins: [DragDropMixin, LinkedStateMixin],

    statics: {
      configureDragDrop(register) {
        register(sourceColor, {
          dragSource: dragSource
        });
      }
    },

    getInitialState() {
      return {
        forbidDrag: false
      };
    },

    render() {
      var { isDragging } = this.getDragState(sourceColor),
          backgroundColor;

      switch (sourceColor) {
      case Colors.YELLOW:
        backgroundColor = 'lightgoldenrodyellow';
        break;
      case Colors.BLUE:
        backgroundColor = 'lightblue';
        break;
      }

      return (
        <div {...this.dragSourceFor(sourceColor)}
             style={{
               border: '1px dashed gray',
               backgroundColor: backgroundColor,
               padding: '0.5rem',
               margin: '0.5rem',
               opacity: isDragging ? 0.4 : 1
             }}>

          <input type='checkbox'
                 checkedLink={this.linkState('forbidDrag')}>
            Forbid drag
          </input>

          {this.props.children}
        </div>
      );
    }
  });

  return Source;
}

module.exports = makeSource;