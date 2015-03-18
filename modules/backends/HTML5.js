import { DragSource } from 'dnd-core';
import NativeTypes from '../NativeTypes';
import EnterLeaveCounter from '../utils/EnterLeaveCounter';
import warning from 'react/lib/warning';

function isUrlDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf('Url') > -1 || types.indexOf('text/uri-list') > -1;
}

function isFileDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf('Files') > -1;
}

class FileDragSource extends DragSource {
  constructor() {
    this.item = {
      get files() {
        warning(false, 'Browser doesn\'t allow reading file information until the files are dropped.');
        return null;
      }
    };
  }

  mutateItemByReadingDataTransfer(dataTransfer) {
    delete this.item.files;
    this.item.files = Array.prototype.slice.call(dataTransfer.files);
  }

  beginDrag() {
    return this.item;
  }
}

class UrlDragSource extends DragSource {
  constructor() {
    this.item = {
      get urls() {
        warning(false, 'Browser doesn\'t allow reading URL information until the link is dropped.');
        return null;
      }
    };
  }

  mutateItemByReadingDataTransfer(dataTransfer) {
    delete this.item.urls;
    this.item.urls = (
      dataTransfer.getData('Url') ||
      dataTransfer.getData('text/uri-list') || ''
    ).split('\n');
  }

  beginDrag() {
    return this.item;
  }
}

export default class HTML5Backend {
  constructor(actions, monitor, registry) {
    this.actions = actions;
    this.monitor = monitor;
    this.registry = registry;

    this.nodeHandlers = {};
    this.enterLeaveCounter = new EnterLeaveCounter();

    this.handleTopDragStart = this.handleTopDragStart.bind(this);
    this.handleTopDragStartCapture = this.handleTopDragStartCapture.bind(this);
    this.handleTopDragEnd = this.handleTopDragEnd.bind(this);
    this.handleTopDragEndCapture = this.handleTopDragEndCapture.bind(this);
    this.handleTopDragEnter = this.handleTopDragEnter.bind(this);
    this.handleTopDragEnterCapture = this.handleTopDragEnterCapture.bind(this);
    this.handleTopDragLeave = this.handleTopDragLeave.bind(this);
    this.handleTopDragLeaveCapture = this.handleTopDragLeaveCapture.bind(this);
    this.handleTopDragOver = this.handleTopDragOver.bind(this);
    this.handleTopDragOverCapture = this.handleTopDragOverCapture.bind(this);
    this.handleTopDrop = this.handleTopDrop.bind(this);
    this.handleTopDropCapture = this.handleTopDropCapture.bind(this);
  }

  setup() {
    window.addEventListener('dragstart', this.handleTopDragStart);
    window.addEventListener('dragstart', this.handleTopDragStartCapture, true);
    window.addEventListener('dragend', this.handleTopDragEnd);
    window.addEventListener('dragend', this.handleTopDragEndCapture, true);
    window.addEventListener('dragenter', this.handleTopDragEnter);
    window.addEventListener('dragenter', this.handleTopDragEnterCapture, true);
    window.addEventListener('dragleave', this.handleTopDragLeave);
    window.addEventListener('dragleave', this.handleTopDragLeaveCapture, true);
    window.addEventListener('dragover', this.handleTopDragOver);
    window.addEventListener('dragover', this.handleTopDragOverCapture, true);
    window.addEventListener('drop', this.handleTopDrop);
    window.addEventListener('drop', this.handleTopDropCapture, true);
  }

  teardown() {
    window.removeEventListener('dragstart', this.handleTopDragStart);
    window.removeEventListener('dragstart', this.handleTopDragStartCapture, true);
    window.removeEventListener('dragend', this.handleTopDragEnd);
    window.removeEventListener('dragend', this.handleTopDragEndCapture, true);
    window.removeEventListener('dragenter', this.handleTopDragEnter);
    window.removeEventListener('dragenter', this.handleTopDragEnterCapture, true);
    window.removeEventListener('dragleave', this.handleTopDragLeave);
    window.removeEventListener('dragleave', this.handleTopDragLeaveCapture, true);
    window.removeEventListener('dragover', this.handleTopDragOver);
    window.removeEventListener('dragover', this.handleTopDragOverCapture, true);
    window.removeEventListener('drop', this.handleTopDrop);
    window.removeEventListener('drop', this.handleTopDropCapture, true);
  }

  getDragImageOffset() {
    // TODO: not implemented
    // A good test case is canDrag(): false on child.
    // With parent as preview, we need to manually calculate the offset.
    return [0, 0];
  }

  isDraggingNativeItem() {
    switch (this.monitor.getItemType()) {
    case NativeTypes.FILE:
    case NativeTypes.URL:
      return true;
    default:
      return false;
    }
  }

  beginDragNativeUrl() {
    const sourceHandle = this.registry.addSource(NativeTypes.URL, new UrlDragSource());
    this.actions.beginDrag(sourceHandle);
  }

  beginDragNativeFile() {
    const sourceHandle = this.registry.addSource(NativeTypes.FILE, new FileDragSource());
    this.actions.beginDrag(sourceHandle);
  }

  handleTopDragStartCapture() {
    this.dragStartSourceHandles = [];
    this.dragStartOriginalTarget = null;
  }

  handleDragStart(e, sourceHandle) {
    this.dragStartSourceHandles.push([sourceHandle, e.currentTarget]);
  }

  handleTopDragStart(e) {
    const { dragStartSourceHandles } = this;
    this.dragStartSourceHandles = null;

    // Try calling beginDrag() on each drag source
    // until one of them agrees to to be dragged.
    let sourceHandle = null;
    let node = null;
    for (let i = 0; i < dragStartSourceHandles.length; i++) {
      [sourceHandle, node] = dragStartSourceHandles[i];
      this.actions.beginDrag(sourceHandle);

      if (this.monitor.isDragging()) {
        break;
      }
    }

    const { dataTransfer } = e;
    if (this.monitor.isDragging()) {
      // If child drag source refuses drag but parent agrees,
      // use parent's node as drag image. This won't work in IE.
      const dragOffset = this.getDragImageOffset(node);
      dataTransfer.setDragImage(node, ...dragOffset);
      dataTransfer.setData('application/json', {});

      this.dragStartOriginalTarget = e.target;
    } else if (isUrlDataTransfer(dataTransfer)) {
      // URL dragged from inside the document
      this.beginDragNativeUrl();
    } else {
      // If by this time no drag source reacted, tell browser not to drag.
      e.preventDefault();
    }
  }

  handleTopDragEndCapture() {
    if (!this.dragStartOriginalTarget) {
      // Firefox can dispatch this event in an infinite loop
      // if dragend handler does something like showing an alert.
      // Exit early if we know it has been handled.
      return;
    }

    this.dragStartOriginalTarget = null;
    this.actions.endDrag();
  }

  handleTopDragEnd() {
  }

  handleTopDragOverCapture(e) {
    this.dragOverTargetHandles = [];

    if (this.isDraggingNativeItem()) {
      e.preventDefault();
    }
  }

  handleDragOver(e, targetHandle) {
    this.dragOverTargetHandles.unshift(targetHandle);
    this.actions.hover(this.dragEnterTargetHandles);
  }

  handleTopDragOver(e) {
    const { dragOverTargetHandles } = this;
    this.dragOverTargetHandles = [];
    this.actions.hover(dragOverTargetHandles);

    const canDrop = dragOverTargetHandles.some(
      targetHandle => this.monitor.canDrop(targetHandle)
    );
    if (canDrop) {
      e.preventDefault();
      // TODO: let user customize drop effect
      e.dataTransfer.dropEffect = 'copy';
    }
  }

  handleTopDragEnterCapture(e) {
    this.dragEnterTargetHandles = [];

    const isFirstEnter = this.enterLeaveCounter.enter(e.target);
    if (!isFirstEnter || this.monitor.isDragging()) {
      return;
    }

    const { dataTransfer } = e;
    if (isFileDataTransfer(dataTransfer)) {
      // File dragged from outside the document
      this.beginDragNativeFile();
    } else if (isUrlDataTransfer(dataTransfer)) {
      // URL dragged from outside the document
      this.beginDragNativeUrl();
    }
  }

  handleDragEnter(e, targetHandle) {
    this.dragEnterTargetHandles.unshift(targetHandle);
    this.actions.hover(this.dragEnterTargetHandles);
  }

  handleTopDragEnter(e) {
    const { dragEnterTargetHandles } = this;
    this.dragEnterTargetHandles = [];
    this.actions.hover(dragEnterTargetHandles);

    const canDrop = dragEnterTargetHandles.some(
      targetHandle => this.monitor.canDrop(targetHandle)
    );

    if (canDrop) {
      // IE requires this to fire dragover events
      e.preventDefault();
    }
  }

  handleTopDragLeaveCapture(e) {
    if (this.isDraggingNativeItem()) {
      e.preventDefault();
    }

    const isLastLeave = this.enterLeaveCounter.leave(e.target);
    if (!isLastLeave || !this.isDraggingNativeItem()) {
      return;
    }

    this.actions.endDrag();
  }

  handleTopDragLeave() {
  }

  handleTopDropCapture(e) {
    this.dropTargetHandles = [];

    if (this.isDraggingNativeItem()) {
      e.preventDefault();

      const sourceHandle = this.monitor.getSourceHandle();
      const source = this.registry.getSource(sourceHandle);
      source.mutateItemByReadingDataTransfer(e.dataTransfer);
    }

    this.enterLeaveCounter.reset();
  }

  handleDrop(e, targetHandle) {
    this.dropTargetHandles.unshift(targetHandle);
  }

  handleTopDrop() {
    const { dropTargetHandles } = this;
    this.dropTargetHandles = [];

    this.actions.hover(dropTargetHandles);
    this.actions.drop();

    if (this.isDraggingNativeItem()) {
      this.actions.endDrag();
    }
  }

  updateSourceNode(sourceHandle, node) {
    let nodeHandlers = this.nodeHandlers[sourceHandle];
    if (nodeHandlers && nodeHandlers.node === node) {
      return;
    }

    if (nodeHandlers) {
      nodeHandlers.node.removeEventListener('dragstart', nodeHandlers.dragstart);
    }

    if (node) {
      nodeHandlers = this.nodeHandlers[sourceHandle] = {
        node,
        dragstart: (e) => this.handleDragStart(e, sourceHandle)
      };

      node.setAttribute('draggable', true);
      node.addEventListener('dragstart', nodeHandlers.dragstart);
    } else {
      delete this.nodeHandlers[sourceHandle];
    }
  }

  updateTargetNode(targetHandle, node) {
    let nodeHandlers = this.nodeHandlers[targetHandle];
    if (nodeHandlers && nodeHandlers.node === node) {
      return;
    }

    if (nodeHandlers) {
      nodeHandlers.node.removeEventListener('dragenter', nodeHandlers.dragenter);
      nodeHandlers.node.removeEventListener('dragover', nodeHandlers.dragover);
      nodeHandlers.node.removeEventListener('drop', nodeHandlers.drop);
    }

    if (node) {
      nodeHandlers = this.nodeHandlers[targetHandle] = {
        node,
        dragenter: (e) => this.handleDragEnter(e, targetHandle),
        dragover: (e) => this.handleDragOver(e, targetHandle),
        drop: (e) => this.handleDrop(e, targetHandle)
      };

      node.addEventListener('dragenter', nodeHandlers.dragenter);
      node.addEventListener('dragover', nodeHandlers.dragover);
      node.addEventListener('drop', nodeHandlers.drop);
    } else {
      delete this.nodeHandlers[targetHandle];
    }
  }
}