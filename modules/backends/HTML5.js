'use strict';

export default class HTML5Backend {
  constructor(actions) {
    this.actions = actions;
  }

  getDraggableProps(sourceHandle) {
    return {
      draggable: true,
      onDragStart: (e) => this.handleDragStart(e, sourceHandle),
      onDragEnd: (e) => this.handleDragEnd(e)
    };
  }

  getDroppableProps(targetHandle) {
    return {
      onDragEnter: (e) => this.handleDragEnter(e, targetHandle),
      onDragOver: (e) => this.handleDragOver(e, targetHandle),
      onDragLeave: (e) => this.handleDragLeave(e, targetHandle),
      onDrop: (e) => this.handleDrop(e, targetHandle)
    };
  }

  handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the
  }

  handleDragEnter(e, targetHandle) {
    this.actions.enter(targetHandle);
  }

  handleDragLeave(e, targetHandle) {
    this.actions.leave(targetHandle);
  }

  handleDrop() {
    this.actions.drop();
  }

  handleDragStart(e, sourceHandle) {
    this.actions.beginDrag(sourceHandle);
  }

  handleDragEnd() {
    this.actions.endDrag();
  }
}