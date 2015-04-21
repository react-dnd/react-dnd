import { DropTarget } from 'dnd-core';
import invariant from 'invariant';
import isString from 'lodash/lang/isString';
import isArray from 'lodash/lang/isArray';
import isObject from 'lodash/lang/isObject';

export default class ComponentDropTarget extends DropTarget {
  constructor(type, spec = {}, props, getComponentRef) {
    super();

    invariant(isString(type) || isArray(type), 'Expected type to be a string or an array.');
    invariant(isObject(spec), 'Expected spec to be an object.');

    this.type = type;
    this.spec = spec;
    this.props = props;
    this.getComponentRef = getComponentRef;
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
    this.getComponentRef = handler.getComponentRef;
    return true;
  }

  canDrop(monitor, id) {
    if (this.spec.canDrop) {
      return this.spec.canDrop.call(null, this.props, monitor);
    } else {
      return super.canDrop(monitor, id);
    }
  }

  hover(monitor, id) {
    if (this.spec.hover) {
      const component = this.getComponentRef();
      return this.spec.hover.call(null, this.props, monitor, component, id);
    } else {
      return super.hover(monitor, id);
    }
  }

  drop(monitor, id) {
    if (this.spec.drop) {
      const component = this.getComponentRef();
      return this.spec.drop.call(null, this.props, monitor, component, id);
    } else {
      return super.drop(monitor, id);
    }
  }
}