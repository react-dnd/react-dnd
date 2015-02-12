'use strict';

var DragDropStore = require('../stores/DragDropStore');

var DragFeedbackMixin = {
  getInitialState() {
    return this.getStateFromDragDropStore();
  },

  getStateFromDragDropStore() {
    var dragStartOffset = DragDropStore.getDragStartOffset(),
        dragOffset = DragDropStore.getDragOffset(),
        isDragging = DragDropStore.getDraggedItemType() !== null;

    return {
      isDragging: isDragging,
      draggedItem: DragDropStore.getDraggedItem(),
      x: isDragging ? dragOffset.x - dragStartOffset.x : undefined,
      y: isDragging ? dragOffset.y - dragStartOffset.y : undefined
    };
  },

  handleDragDropStoreChange() {
    if (this.isMounted()) {
      this.setState(this.getStateFromDragDropStore());
    }
  },

  componentDidMount() {
    DragDropStore.addChangeListener(this.handleDragDropStoreChange);
  },

  componentWillUnmount() {
    DragDropStore.removeChangeListener(this.handleDragDropStoreChange);
  }
};

module.exports = DragFeedbackMixin;