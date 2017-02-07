import { DragSource } from '../src';

export class NormalSource extends DragSource {
  constructor(item) {
    super();
    this.item = item || { baz: 42 };
    this.didCallBeginDrag = false;
  }

  beginDrag() {
    this.didCallBeginDrag = true;
    return this.item;
  }

  endDrag(monitor) {
    this.recordedDropResult = monitor.getDropResult();
  }
}

export class NonDraggableSource extends DragSource {
  constructor() {
    super();
    this.didCallBeginDrag = false;
  }

  canDrag() {
    return false;
  }

  beginDrag() {
    this.didCallBeginDrag = true;
    return {};
  }
}

export class BadItemSource extends DragSource {
  beginDrag() {
    return 42;
  }
}

export class NumberSource extends DragSource {
  constructor(number, allowDrag) {
    super();
    this.number = number;
    this.allowDrag = allowDrag;
  }

  canDrag() {
    return this.allowDrag;
  }

  isDragging(monitor) {
    const item = monitor.getItem();
    return item.number === this.number;
  }

  beginDrag() {
    return {
      number: this.number,
    };
  }
}
