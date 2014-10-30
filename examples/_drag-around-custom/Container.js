/** @jsx React.DOM */
'use strict';

var React = require('react'),
    update = require('react/lib/update'),
    ItemTypes = require('./ItemTypes'),
    Box = require('./Box'),
    { PropTypes } = React,
    { DragDropMixin } = require('react-dnd');

var Container = React.createClass({
  mixins: [DragDropMixin],

  propTypes: {
    snapToGrid: PropTypes.bool.isRequired
  },

  getInitialState() {
    return {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' },
      }
    };
  },

  configureDragDrop(registerType) {
    registerType(ItemTypes.BOX, {
      dropTarget: {
        over(item, e) {
          var left = Math.round(item.startLeft + (e.pageX - item.startPageX)),
              top = Math.round(item.startTop + (e.pageY - item.startPageY));

          if (this.props.snapToGrid) {
            left = Math.round(left / 32) * 32;
            top = Math.round(top / 32) * 32;
          }

          this.moveBox(item.id, left, top);
        }
      }
    });
  },

  moveBox(id, left, top) {
    var stateUpdate = {
      boxes: {}
    };

    stateUpdate.boxes[id] = {
      $merge: {
        left: left,
        top: top
      }
    };

    this.setState(update(this.state, stateUpdate));
  },

  render() {
    return (
      <div {...this.dropTargetFor(ItemTypes.BOX)}
           style={{
             width: 300,
             height: 300,
             border: '1px solid black',
             position: 'relative'
           }}>

        {Object.keys(this.state.boxes).map(key => {
          var box = this.state.boxes[key];

          return (
            <Box key={key}
                 id={key}
                 left={box.left}
                 top={box.top}>
              {box.title}
            </Box>
          );
        })}

      </div>
    );
  }
});

module.exports = Container;