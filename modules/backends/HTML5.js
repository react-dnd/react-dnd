'use strict';

let nextId = 0;

export default class HTML5Backend {
  constructor(actions) {
    this.actions = actions;
    this.mime = `application/dnd-${nextId++}`;
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
      onDragEnter: (e) => this.handleDragEnter(e, targetHandle),
      onDragOver: (e) => this.handleDragOver(e, targetHandle),
      onDragLeave: (e) => this.handleDragLeave(e, targetHandle),
      onDrop: (e) => this.handleDrop(e, targetHandle)
    };
  }

  handleDragOver(e) {
    if (e.dataTransfer.types.indexOf(this.mime) === -1) {
      return;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
  }

  handleDragEnter(e, targetHandle) {
    if (e.dataTransfer.types.indexOf(this.mime) === -1) {
      return;
    }

    this.actions.enter(targetHandle);
  }

  handleDragLeave(e, targetHandle) {
    if (e.dataTransfer.types.indexOf(this.mime) === -1) {
      return;
    }

    this.actions.leave(targetHandle);
  }

  handleDrop(e) {
    if (e.dataTransfer.types.indexOf(this.mime) === -1) {
      return;
    }

    this.actions.drop();
  }

  handleDragStart(e, sourceHandle) {
    e.dataTransfer.setData(this.mime, {});
    this.actions.beginDrag(sourceHandle);
  }

  handleDragEnd() {
    this.actions.endDrag();
  }
}