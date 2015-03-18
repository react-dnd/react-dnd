import { findDOMNode } from 'react';

export default class HTML5Backend {
  constructor(actions, monitor) {
    this.actions = actions;
    this.monitor = monitor;

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

  handleTopDragStartCapture() {
    this.dragStartSourceHandles = [];
    this.dragStartOriginalTarget = null;
  }

  handleDragStart(e, sourceHandle, component) {
    this.dragStartSourceHandles.push([sourceHandle, component]);
  }

  handleTopDragStart(e) {
    const { dragStartSourceHandles } = this;
    this.dragStartSourceHandles = null;

    // Try calling beginDrag() on each drag source
    // until one of them agrees to to be dragged.
    let sourceHandle = null;
    let component = null;
    for (let i = 0; i < dragStartSourceHandles.length; i++) {
      [sourceHandle, component] = dragStartSourceHandles[i];
      this.actions.beginDrag(sourceHandle);

      if (this.monitor.isDragging()) {
        break;
      }
    }

    // If none agreed, cancel the dragging.
    if (!this.monitor.isDragging()) {
      e.preventDefault();
      return;
    }

    // Save the original target so we can later check
    // dragend events against it.
    this.dragStartOriginalTarget = e.target;

    // Specify backend's MIME so other backends
    // don't interfere with this drag operation.
    e.dataTransfer.setData(this.mime, {});

    // If child drag source refuses drag but parent agrees,
    // use parent's node as drag image. This won't work in IE.
    const node = findDOMNode(component);
    const dragOffset = this.getDragImageOffset(node);
    e.dataTransfer.setDragImage(node, ...dragOffset);
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

  handleTopDragOverCapture() {
    this.dragOverTargetHandles = [];
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

  handleTopDragEnterCapture() {
    this.dragEnterTargetHandles = [];
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

  handleTopDragLeaveCapture() {
  }

  handleTopDragLeave() {
  }

  handleTopDropCapture() {
    this.dropTargetHandles = [];
  }

  handleDrop(e, targetHandle) {
    this.dropTargetHandles.unshift(targetHandle);
  }

  handleTopDrop() {
    const { dropTargetHandles } = this;
    this.dropTargetHandles = [];

    this.actions.hover(dropTargetHandles);
    this.actions.drop();
  }

  getSourceProps(sourceHandle, component) {
    return {
      draggable: true,
      onDragStart: (e) => this.handleDragStart(e, sourceHandle, component)
    };
  }

  getTargetProps(targetHandle) {
    return {
      onDragEnter: (e) => this.handleDragEnter(e, targetHandle),
      onDragOver: (e) => this.handleDragOver(e, targetHandle),
      onDrop: (e) => this.handleDrop(e, targetHandle)
    };
  }
}