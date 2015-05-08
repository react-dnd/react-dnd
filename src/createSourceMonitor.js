class SourceMonitor {
  constructor(manager) {
    this.monitor = manager.getMonitor();
  }

  receiveHandlerId(sourceId) {
    this.sourceId = sourceId;
  }

  canDrag() {
    return this.monitor.canDragSource(this.sourceId);
  }

  isDragging() {
    return this.monitor.isDraggingSource(this.sourceId);
  }

  getItemType() {
    return this.monitor.getItemType();
  }

  getItem() {
    return this.monitor.getItem();
  }

  getDropResult() {
    return this.monitor.getDropResult();
  }

  didDrop() {
    return this.monitor.didDrop();
  }

  getInitialClientOffset() {
    return this.monitor.getInitialClientOffset();
  }

  getInitialSourceClientOffset() {
    return this.monitor.getInitialSourceClientOffset();
  }

  getSourceClientOffset() {
    return this.monitor.getSourceClientOffset();
  }

  getClientOffset() {
    return this.monitor.getClientOffset();
  }

  getDifferenceFromInitialOffset() {
    return this.monitor.getDifferenceFromInitialOffset();
  }
}

export default function createSourceMonitor(manager) {
  return new SourceMonitor(manager);
}