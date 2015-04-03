import { DragSource } from 'dnd-core';
import invariant from 'react/lib/invariant';
import isString from 'lodash/lang/isString';
import isObject from 'lodash/lang/isObject';

export default class ComponentDragSource extends DragSource {
  constructor(type, spec, props, getComponentRef) {
    invariant(isString(type), 'Expected type to be a string.');
    invariant(isObject(spec), 'Expected spec to be an object.');

    this.type = type;
    this.spec = spec;
    this.props = props;
    this.getComponentRef = getComponentRef;
  }

  receive(handler) {
    if (!(handler instanceof ComponentDragSource)) {
      return false;
    }

    if (this.type !== handler.type) {
      return false;
    }

    this.spec = handler.spec;
    this.props = handler.props;
    this.getComponentRef = handler.getComponentRef;
    return true;
  }

  canDrag(...args) {
    if (this.spec.canDrag) {
      return this.spec.canDrag.call(null, this.props, ...args);
    } else {
      return super.canDrag(...args);
    }
  }

  isDragging(...args) {
    if (this.spec.isDragging) {
      return this.spec.isDragging.call(null, this.props, ...args);
    } else {
      return super.isDragging(...args);
    }
  }

  beginDrag(...args) {
    return this.spec.beginDrag.call(null, this.props, ...args, this.getComponentRef());
  }

  endDrag(...args) {
    if (this.spec.endDrag) {
      return this.spec.endDrag.call(null, this.props, ...args, this.getComponentRef());
    } else {
      return super.endDrag(...args);
    }
  }
}