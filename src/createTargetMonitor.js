class TargetMonitor {
  constructor(manager) {
    this.monitor = manager.getMonitor();
  }

  receiveHandlerId(targetId) {
    this.targetId = targetId;
  }

  canDrop() {
    return this.monitor.canDropOnTarget(this.targetId);
  }

  isOver(options) {
    return this.monitor.isOverTarget(this.targetId, options);
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

export default function createTargetMonitor(manager) {
  return new TargetMonitor(manager);
}