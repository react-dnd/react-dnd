'use strict';

var DragDropStore = require('../stores/DragDropStore');

var DragFeedbackMixin = {
  getInitialState() {
    return this.getStateFromDragDropStore();
  },

  getStateFromDragDropStore() {
    var coordinates = DragDropStore.getDragCoordinates();

    return {
      isDragging: DragDropStore.getDraggedItemType() !== null,
      clientX: coordinates && coordinates.clientX,
      clientY: coordinates && coordinates.clientY
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