import { DropTarget } from 'dnd-core';
import invariant from 'react/lib/invariant';
import isString from 'lodash/lang/isString';
import isArray from 'lodash/lang/isArray';
import isObject from 'lodash/lang/isObject';

export default class ComponentDropTarget extends DropTarget {
  constructor(type, spec) {
    invariant(isString(type) || isArray(type), 'Expected type to be a string or an array.');
    invariant(isObject(spec), 'Expected spec to be an object.');

    this.type = type;
    this.spec = spec;
  }

  receive(handler) {
    if (!(handler instanceof ComponentDropTarget)) {
      return false;
    }

    if (this.type !== handler.type) {
      return false;
    }

    this.spec = handler.spec;
    return true;
  }

  canDrop(...args) {
    if (this.spec.canDrop) {
      return this.spec.canDrop.apply(null, args);
    } else {
      return super.canDrop(...args);
    }
  }

  drop(...args) {
    if (this.spec.drop) {
      return this.spec.drop.apply(null, args);
    } else {
      return super.drop(...args);
    }
  }
}