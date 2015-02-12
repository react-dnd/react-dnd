/** @jsx React.DOM */
'use strict';

var React = require('react'),
    update = require('react/lib/update'),
    ItemTypes = require('./ItemTypes'),
    Box = require('./Box'),
    { PropTypes } = React,
    { MouseDragDropMixin } = require('react-dnd');

var Container = React.createClass({
  mixins: [MouseDragDropMixin],

  getInitialState() {
    return {
      boxes: {
        'a': { top: 20, left: 80, title: 'Drag me around' },
        'b': { top: 180, left: 20, title: 'Drag me too' },
      }
    };
  },

  statics: {
    configureDragDrop(registerType) {
      registerType(ItemTypes.BOX, {
        dropTarget: {
          acceptDrop(component, item, e) {
            var left = Math.round(item.startLeft + (e.clientX - item.startClientX)),
                top = Math.round(item.startTop + (e.clientY - item.startClientY));

            component.moveBox(item.id, left, top);
          }
        }
      });
    }
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
    var cursor;
    if (this.state.draggedItemType === 'box') {
      cursor = '-webkit-grabbing';
    }

    return (
      <div {...this.dropTargetFor(ItemTypes.BOX)}
           style={{
             cursor: cursor,
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
