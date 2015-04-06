import { DragSource } from 'dnd-core';
import NativeTypes from '../NativeTypes';
import EnterLeaveCounter from '../utils/EnterLeaveCounter';
import shallowEqual from '../utils/shallowEqual';
import invariant from 'react/lib/invariant';
import warning from 'react/lib/warning';

function isUrlDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf('Url') > -1 || types.indexOf('text/uri-list') > -1;
}

function isFileDataTransfer(dataTransfer) {
  var types = Array.prototype.slice.call(dataTransfer.types);
  return types.indexOf('Files') > -1;
}

const ELEMENT_NODE = 1;

function getElementRect(el) {
  if (el.nodeType !== ELEMENT_NODE) {
    el = el.parentElement;
  }

  if (!el) {
    return null;
  }

  const { top, left, width, height } = el.getBoundingClientRect();
  return { top, left, width, height };
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

    this.sourcePreviewNodes = {};
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
    this.endDragIfSourceWasRemovedFromDOM = this.endDragIfSourceWasRemovedFromDOM.bind(this);
    this.connectSourceNode = this.connectSourceNode.bind(this);
    this.connectSourcePreviewNode = this.connectSourcePreviewNode.bind(this);
    this.connectTargetNode = this.connectTargetNode.bind(this);
  }

  setup() {
    invariant(!this.constructor.isSetUp, 'Cannot have two HTML5 backends at the same time.');
    this.constructor.isSetUp = true;

    if (typeof window === 'undefined') {
      return;
    }

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
    this.constructor.isSetUp = false;

    if (typeof window === 'undefined') {
      return;
    }

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

    this.clearCurrentDragSourceNode();
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
    this.clearCurrentDragSourceNode();

    this.currentNativeSource = new UrlDragSource();
    this.currentNativeHandle = this.registry.addSource(NativeTypes.URL, this.currentNativeSource);
    this.actions.beginDrag(this.currentNativeHandle);
  }

  beginDragNativeFile() {
    this.clearCurrentDragSourceNode();

    this.currentNativeSource = new FileDragSource();
    this.currentNativeHandle = this.registry.addSource(NativeTypes.FILE, this.currentNativeSource);
    this.actions.beginDrag(this.currentNativeHandle);
  }

  endDragNativeItem() {
    this.actions.endDrag();
    this.registry.removeSource(this.currentNativeHandle);
    this.currentNativeHandle = null;
    this.currentNativeSource = null;
  }

  endDragIfSourceWasRemovedFromDOM() {
    const node = this.currentDragSourceNode;
    if (document.body.contains(node)) {
      return;
    }

    this.actions.endDrag();
    this.clearCurrentDragSourceNode();
  }

  setCurrentDragSourceNode(node) {
    this.clearCurrentDragSourceNode();
    this.currentDragSourceNode = node;
    this.currentDragSourceNodeRect = getElementRect(node);
    this.currentDragSourceNodeRectChanged = false;

    // Receiving a mouse event in the middle of a dragging operation
    // means it has ended and the drag source node disappeared from DOM,
    // so the browser didn't dispatch the dragend event.
    window.addEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
  }

  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      this.currentDragSourceNode = null;
      this.currentDragSourceNodeRect = null;
      this.currentDragSourceNodeRectChanged = false;
      window.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
      return true;
    } else {
      return false;
    }
  }

  checkIfCurrentDragSourceRectChanged() {
    const node = this.currentDragSourceNode;
    if (!node) {
      return false;
    }

    if (this.currentDragSourceNodeRectChanged) {
      return true;
    }

    this.currentDragSourceNodeRectChanged = !shallowEqual(
      getElementRect(node),
      this.currentDragSourceNodeRect
    );

    return this.currentDragSourceNodeRectChanged;
  }

  handleTopDragStartCapture() {
    this.clearCurrentDragSourceNode();
    this.dragStartSourceHandles = [];
  }

  handleDragStart(e, sourceId) {
    this.dragStartSourceHandles.push([sourceId, e.currentTarget]);
  }

  handleTopDragStart(e) {
    const { dragStartSourceHandles } = this;
    this.dragStartSourceHandles = null;

    // Try calling beginDrag() on each drag source
    // until one of them agrees to to be dragged.
    let sourceId = null;
    let node = null;
    for (let i = 0; i < dragStartSourceHandles.length; i++) {
      [sourceId, node] = dragStartSourceHandles[i];
      // Pass false to keep drag source unpublished.
      // We will publish it in the next tick so browser
      // has time to screenshot current state and doesn't
      // cancel drag if the source DOM node is removed.
      this.actions.beginDrag(sourceId, false);

      if (this.monitor.isDragging()) {
        break;
      }
    }

    const { dataTransfer } = e;
    if (this.monitor.isDragging()) {
      // Use custom drag image if user specifies it.
      // If child drag source refuses drag but parent agrees,
      // use parent's node as drag image. Neither works in IE though.
      const dragPreview = this.sourcePreviewNodes[sourceId] || node;
      const dragOffset = this.getDragImageOffset(dragPreview);
      dataTransfer.setDragImage(dragPreview, ...dragOffset);

      try {
        // Firefox won't drag without setting data
        dataTransfer.setData('application/json', {});
      } catch (err) {
        // IE doesn't support MIME types in setData
      }

      // Store drag source node so we can check whether
      // it is removed from DOM and trigger endDrag manually.
      this.setCurrentDragSourceNode(e.target);

      setTimeout(() => {
        // By now, the browser has taken drag screenshot
        // and we can safely let the drag source know it's active.
        this.actions.publishDragSource();
      });

    } else if (isUrlDataTransfer(dataTransfer)) {
      // URL dragged from inside the document
      this.beginDragNativeUrl();
    } else {
      // If by this time no drag source reacted, tell browser not to drag.
      e.preventDefault();
    }
  }

  handleTopDragEndCapture() {
    if (this.clearCurrentDragSourceNode()) {
      // Firefox can dispatch this event in an infinite loop
      // if dragend handler does something like showing an alert.
      // Only proceed if we have not handled it already.
      this.actions.endDrag();
    }
  }

  handleTopDragEnd() {
  }

  handleTopDragOverCapture() {
    this.dragOverTargetHandles = [];
  }

  handleDragOver(e, targetId) {
    this.dragOverTargetHandles.unshift(targetId);
  }

  handleTopDragOver(e) {
    const { dragOverTargetHandles } = this;
    this.dragOverTargetHandles = [];
    this.actions.hover(dragOverTargetHandles);

    const canDrop = dragOverTargetHandles.some(
      targetId => this.monitor.canDrop(targetId)
    );

    if (canDrop) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    } else if (this.isDraggingNativeItem()) {
      // Don't show a nice cursor but still prevent default
      // "drop and blow away the whole document" action.
      e.preventDefault();
      e.dataTransfer.dropEffect = 'none';
    } else if (this.checkIfCurrentDragSourceRectChanged()) {
      // Prevent animating to incorrect position.
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
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

  handleDragEnter(e, targetId) {
    this.dragEnterTargetHandles.unshift(targetId);
  }

  handleTopDragEnter(e) {
    const { dragEnterTargetHandles } = this;
    this.dragEnterTargetHandles = [];
    this.actions.hover(dragEnterTargetHandles);

    const canDrop = dragEnterTargetHandles.some(
      targetId => this.monitor.canDrop(targetId)
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

    this.endDragNativeItem();
  }

  handleTopDragLeave() {
  }

  handleTopDropCapture(e) {
    this.dropTargetHandles = [];

    if (this.isDraggingNativeItem()) {
      e.preventDefault();
      this.currentNativeSource.mutateItemByReadingDataTransfer(e.dataTransfer);
    }

    this.enterLeaveCounter.reset();
  }

  handleDrop(e, targetId) {
    this.dropTargetHandles.unshift(targetId);
  }

  handleTopDrop() {
    const { dropTargetHandles } = this;
    this.dropTargetHandles = [];

    this.actions.hover(dropTargetHandles);
    this.actions.drop();

    if (this.isDraggingNativeItem()) {
      this.endDragNativeItem();
    } else {
      this.endDragIfSourceWasRemovedFromDOM();
    }
  }

  connect() {
    return {
      dragSource: this.connectSourceNode,
      dragSourcePreview: this.connectSourcePreviewNode,
      dropTarget: this.connectTargetNode
    };
  }

  connectSourcePreviewNode(sourceId, node) {
    this.sourcePreviewNodes[sourceId] = node;

    return () => {
      delete this.sourcePreviewNodes[sourceId];
    };
  }

  connectSourceNode(sourceId, node) {
    const handleDragStart = (e) => this.handleDragStart(e, sourceId);

    node.setAttribute('draggable', true);
    node.addEventListener('dragstart', handleDragStart);

    return () => {
      node.removeEventListener('dragstart', handleDragStart);
      node.setAttribute('draggable', false);
    };
  }

  connectTargetNode(targetId, node) {
    const handleDragEnter = (e) => this.handleDragEnter(e, targetId);
    const handleDragOver = (e) => this.handleDragOver(e, targetId);
    const handleDrop = (e) => this.handleDrop(e, targetId);

    node.addEventListener('dragenter', handleDragEnter);
    node.addEventListener('dragover', handleDragOver);
    node.addEventListener('drop', handleDrop);

    return () => {
      node.removeEventListener('dragenter', handleDragEnter);
      node.removeEventListener('dragover', handleDragOver);
      node.removeEventListener('drop', handleDrop);
    };
  }
}