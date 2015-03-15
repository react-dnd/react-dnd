'use strict';

var DragOperationStore = require('../stores/DragOperationStore'),
    DragOffsetStore = require('../stores/DragOffsetStore');

var DragLayerMixin = {
  getInitialState() {
    return this.getStateForDragLayerMixin();
  },

  getDragLayerState() {
    var {
      isDragging,
      draggedItemType,
      draggedItem,
      initialOffset,
      currentOffset,
      currentOffsetFromClient,
      initialOffsetFromClient,
      initialOffsetFromContainer
    } = this.state;

    return {
      isDragging,
      draggedItemType,
      draggedItem,
      initialOffset,
      currentOffset,
      currentOffsetFromClient,
      initialOffsetFromClient,
      initialOffsetFromContainer
    };
  },

  getStateForDragLayerMixin() {
    var initialOffsetFromClient = DragOffsetStore.getInitialOffsetFromClient(),
        currentOffsetFromClient = DragOffsetStore.getCurrentOffsetFromClient(),
        initialOffsetFromContainer = DragOffsetStore.getInitialOffsetFromContainer(),
        isDragging = false,
        draggedItemType = null,
        draggedItem = null,
        initialOffset = null,
        currentOffset = null;

    if (initialOffsetFromClient && currentOffsetFromClient) {
      isDragging = true;
      draggedItemType = DragOperationStore.getDraggedItemType();
      draggedItem = DragOperationStore.getDraggedItem();

      initialOffset = {
        x: initialOffsetFromClient.x - initialOffsetFromContainer.x,
        y: initialOffsetFromClient.y - initialOffsetFromContainer.y
      };

      currentOffset = {
        x: currentOffsetFromClient.x - initialOffsetFromContainer.x,
        y: currentOffsetFromClient.y - initialOffsetFromContainer.y
      };
    }

    return {
      isDragging,
      draggedItemType,
      draggedItem,
      initialOffset,
      currentOffset,
      currentOffsetFromClient,
      initialOffsetFromClient,
      initialOffsetFromContainer
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
