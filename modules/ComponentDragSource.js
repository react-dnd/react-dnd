import { DragSource } from 'dnd-core';
import invariant from 'react/lib/invariant';
import isString from 'lodash/lang/isString';
import isObject from 'lodash/lang/isObject';

export default class ComponentDragSource extends DragSource {
  constructor(type, spec) {
    invariant(isString(type), 'Expected type to be a string.');
    invariant(isObject(spec), 'Expected spec to be an object.');

    this.type = type;
    this.spec = spec;
  }

  receive(handler) {
    if (!(handler instanceof ComponentDragSource)) {
      return false;
    }

    if (this.type !== handler.type) {
      return false;
    }

    this.spec = handler.spec;
    return true;
  }

  canDrag(...args) {
    if (this.spec.canDrag) {
      return this.spec.canDrag.apply(null, args);
    } else {
      return super.canDrag(...args);
    }
  }

  isDragging(...args) {
    if (this.spec.isDragging) {
      return this.spec.isDragging.apply(null, args);
    } else {
      return super.isDragging(...args);
    }
  }

  beginDrag(...args) {
    return this.spec.beginDrag.apply(null, args);
  }

  endDrag(...args) {
    if (this.spec.endDrag) {
      return this.spec.endDrag.apply(null, args);
    } else {
      return super.endDrag(...args);
    }
  }
}