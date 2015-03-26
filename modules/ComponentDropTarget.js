import { DropTarget } from 'dnd-core';
import invariant from 'react/lib/invariant';
import isString from 'lodash/lang/isString';
import isArray from 'lodash/lang/isArray';
import isObject from 'lodash/lang/isObject';

export default class ComponentDropTarget extends DropTarget {
  constructor(type, spec = {}, props) {
    invariant(isString(type) || isArray(type), 'Expected type to be a string or an array.');
    invariant(isObject(spec), 'Expected spec to be an object.');

    this.type = type;
    this.spec = spec;
    this.props = props;
  }

  receive(handler) {
    if (!(handler instanceof ComponentDropTarget)) {
      return false;
    }

    if (this.type !== handler.type) {
      return false;
    }

    this.spec = handler.spec;
    this.props = handler.props;
    return true;
  }

  canDrop(...args) {
    if (this.spec.canDrop) {
      return this.spec.canDrop.call(null, this.props, ...args);
    } else {
      return super.canDrop(...args);
    }
  }

  hover(...args) {
    if (this.spec.hover) {
      return this.spec.hover.call(null, this.props, ...args);
    } else {
      return super.hover(...args);
    }
  }

  drop(...args) {
    if (this.spec.drop) {
      return this.spec.drop.call(null, this.props, ...args);
    } else {
      return super.drop(...args);
    }
  }
}