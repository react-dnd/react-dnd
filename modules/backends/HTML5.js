'use strict';

const ELEMENT_NODE_TYPE = 1;
let nextId = 0;

export default class HTML5Backend {
  constructor(actions) {
    this.actions = actions;

    this.id = nextId++;
    this.mime = `application/dnd-${this.id}`;
    this.dropTargetAttribute = `data-react-dnd-target-${this.id}`;

    this.captureTopDragEnter = this.captureTopDragEnter.bind(this);
    this.captureTopDragOver = this.captureTopDragOver.bind(this);
    this.captureTopDrop = this.captureTopDrop.bind(this);
  }

  setup() {
    window.addEventListener('dragenter', this.captureTopDragEnter, true);
    window.addEventListener('dragover', this.captureTopDragOver, true);
    window.addEventListener('drop', this.captureTopDrop, true);
  }

  teardown() {
    window.removeEventListener('dragenter', this.captureTopDragEnter, true);
    window.removeEventListener('dragover', this.captureTopDragOver, true);
    window.removeEventListener('drop', this.captureTopDrop, true);
  }

  captureTopDragEnter(e) {
    if (e.dataTransfer.types.indexOf(this.mime) === -1) {
      return;
    }

    const targetHandles = this.getTargetHandles(e);
    this.actions.hover(targetHandles);
  }

  captureTopDragOver(e) {
    if (e.dataTransfer.types.indexOf(this.mime) === -1) {
      return;
    }

    const targetHandles = this.getTargetHandles(e);
    this.actions.hover(targetHandles);

    if (targetHandles.length > 0) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    }
  }

  captureTopDrop(e) {
    if (e.dataTransfer.types.indexOf(this.mime) === -1) {
      return;
    }

    const targetHandles = this.getTargetHandles(e);
    this.actions.hover(targetHandles);
    this.actions.drop();
  }

  getTargetHandles(e) {
    const targetHandles = [];

    let target = e.target;
    if (target.nodeType !== ELEMENT_NODE_TYPE) {
      target = target.parentElement;
    }

    while (target) {
      if (target.hasAttribute(this.dropTargetAttribute)) {
        targetHandles.unshift(target.getAttribute(this.dropTargetAttribute));
      }
      target = target.parentElement;
    }

    return targetHandles;
  }

  getSourceProps(sourceHandle) {
    return {
      draggable: true,
      onDragStart: (e) => this.handleDragStart(e, sourceHandle),
      onDragEnd: (e) => this.handleDragEnd(e, sourceHandle)
    };
  }

  getTargetProps(targetHandle) {
    return {
      [this.dropTargetAttribute]: targetHandle
    };
  }

  handleDragStart(e, sourceHandle) {
    e.dataTransfer.setData(this.mime, {});
    this.actions.beginDrag(sourceHandle);
  }

  handleDragEnd() {
    this.actions.endDrag();
  }
}