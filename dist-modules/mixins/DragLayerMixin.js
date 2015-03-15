"use strict";

var DragOperationStore = require("../stores/DragOperationStore"),
    DragOffsetStore = require("../stores/DragOffsetStore");

var DragLayerMixin = {
  getInitialState: function getInitialState() {
    return this.getStateForDragLayerMixin();
  },

  getDragLayerState: function getDragLayerState() {
    var _state = this.state;
    var isDragging = _state.isDragging;
    var draggedItemType = _state.draggedItemType;
    var draggedItem = _state.draggedItem;
    var initialOffset = _state.initialOffset;
    var currentOffset = _state.currentOffset;
    var currentOffsetFromClient = _state.currentOffsetFromClient;
    var initialOffsetFromClient = _state.initialOffsetFromClient;
    var initialOffsetFromContainer = _state.initialOffsetFromContainer;


    return {
      isDragging: isDragging,
      draggedItemType: draggedItemType,
      draggedItem: draggedItem,
      initialOffset: initialOffset,
      currentOffset: currentOffset,
      currentOffsetFromClient: currentOffsetFromClient,
      initialOffsetFromClient: initialOffsetFromClient,
      initialOffsetFromContainer: initialOffsetFromContainer
    };
  },

  getStateForDragLayerMixin: function getStateForDragLayerMixin() {
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
      isDragging: isDragging,
      draggedItemType: draggedItemType,
      draggedItem: draggedItem,
      initialOffset: initialOffset,
      currentOffset: currentOffset,
      currentOffsetFromClient: currentOffsetFromClient,
      initialOffsetFromClient: initialOffsetFromClient,
      initialOffsetFromContainer: initialOffsetFromContainer
    };
  },

  handleStoreChangeInDragLayerMixin: function handleStoreChangeInDragLayerMixin() {
    if (this.isMounted()) {
      this.setState(this.getStateForDragLayerMixin());
    }
  },

  componentDidMount: function componentDidMount() {
    DragOffsetStore.addChangeListener(this.handleStoreChangeInDragLayerMixin);
    DragOperationStore.addChangeListener(this.handleStoreChangeInDragLayerMixin);
  },

  componentWillUnmount: function componentWillUnmount() {
    DragOffsetStore.removeChangeListener(this.handleStoreChangeInDragLayerMixin);
    DragOperationStore.removeChangeListener(this.handleStoreChangeInDragLayerMixin);
  }
};

module.exports = DragLayerMixin;