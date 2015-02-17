'use strict';

var DragOperationStore = require('../stores/DragOperationStore'),
    DragOffsetStore = require('../stores/DragOffsetStore');

var DragLayerMixin = {
  getInitialState() {
    return this.getStateForDragLayerMixin();
  },

  getStateForDragLayerMixin() {
    var draggedItemType = DragOperationStore.getDraggedItemType(),
        draggedItem = DragOperationStore.getDraggedItem(),
        initialOffsetFromContainer = DragOffsetStore.getInitialOffsetFromContainer(),
        initialOffsetFromClient = DragOffsetStore.getInitialOffsetFromClient(),
        currentOffsetFromClient = DragOffsetStore.getCurrentOffsetFromClient();

    if (!initialOffsetFromClient || !currentOffsetFromClient) {
      return {
        isDragging: false
      };
    }

    return {
      isDragging: true,
      draggedItemType: draggedItemType,
      draggedItem: draggedItem,
      initialOffset: {
        x: initialOffsetFromClient.x - initialOffsetFromContainer.x,
        y: initialOffsetFromClient.y - initialOffsetFromContainer.y
      },
      currentOffset: {
        x: currentOffsetFromClient.x - initialOffsetFromContainer.x,
        y: currentOffsetFromClient.y - initialOffsetFromContainer.y
      }
    };
  },

  handleStoreChangeInDragLayerMixin() {
    if (this.isMounted()) {
      this.setState(this.getStateForDragLayerMixin());
    }
  },

  componentDidMount() {
    DragOffsetStore.addChangeListener(this.handleStoreChangeInDragLayerMixin);
    DragOperationStore.addChangeListener(this.handleStoreChangeInDragLayerMixin);
  },

  componentWillUnmount() {
    DragOffsetStore.removeChangeListener(this.handleStoreChangeInDragLayerMixin);
    DragOperationStore.removeChangeListener(this.handleStoreChangeInDragLayerMixin);
  }
};

module.exports = DragLayerMixin;