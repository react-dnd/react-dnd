'use strict';

var React = require('react'),
    ItemTypes = require('./ItemTypes'),
    BoxDragPreview = require('./BoxDragPreview'),
    snapToGrid = require('./snapToGrid'),
    { DragLayerMixin } = require('react-dnd'),
    { PropTypes } = React;

var styles = {
  dragLayer: {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width:'100%',
    height: '100%'
  },

  draggedItem: (props, state) => {
    var { x, y } = state.currentOffset;

    if (props.snapToGrid) {
      x -= state.initialOffset.x;
      y -= state.initialOffset.y;

      [x, y] = snapToGrid(x, y);

      x += state.initialOffset.x;
      y += state.initialOffset.y;
    }

    var transform = `translate(${x}px, ${y}px)`;

    return {
      transform: transform,
      WebkitTransform: transform
    };
  }
};

var DragLayer = React.createClass({
  mixins: [DragLayerMixin],

  propTypes: {
    snapToGrid: PropTypes.bool.isRequired
  },

  renderItem(type, item) {
    switch (type) {
    case ItemTypes.BOX:
      return (
        <BoxDragPreview title={item.title} />
      );
    }
  },

  render() {
    var {
      draggedItem,
      draggedItemType,
      isDragging
    } = this.getDragLayerState();

    if (!isDragging) {
      return null;
    }

    return (
      <div style={styles.dragLayer}>
        <div style={styles.draggedItem(this.props, this.state)}>
          {this.renderItem(draggedItemType, draggedItem)}
        </div>
      </div>
    );
  }
});

module.exports = DragLayer;
