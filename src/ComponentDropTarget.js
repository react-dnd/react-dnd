import { DropTarget } from 'dnd-core';
import invariant from 'invariant';
import isObject from 'lodash/lang/isObject';
import isValidType from './utils/isValidType';

const ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop'];

export default class ComponentDropTarget extends DropTarget {
  constructor(type, spec, props, getComponentRef) {
    super();

    if (process.env.NODE_ENV !== 'production') {
      invariant(
        isValidType(type, true),
        'Expected the drop target type to either be a string, a symbol, ' +
        'or an array of either. Instead received %s.',
        type
      );
      invariant(
        isObject(spec) && typeof spec !== 'function',
        'Expected the drop target specification to be an object. ' +
        'Instead received %s.',
        spec
      );
      Object.keys(spec).forEach(key => {
        invariant(
          ALLOWED_SPEC_METHODS.indexOf(key) > -1,
          'Expected the drop target specification to only have ' +
          'some of the following keys: %s. ' +
          'Instead received a specification with an unexpected "%s" key.',
          ALLOWED_SPEC_METHODS.join(', '),
          key
        );
        invariant(
          typeof spec[key] === 'function',
          'Expected %s in the drop target specification to be a function. ' +
          'Instead received a specification with %s: %s.',
          key,
          key,
          spec[key]
        );
      });
    }

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
      const dropResult = this.spec.drop.call(null, this.props, monitor, component, id);
      if (process.env.NODE_ENV !== 'production') {
        invariant(
          typeof dropResult === 'undefined' ||
          isObject(dropResult) && typeof dropResult !== 'function',
          'drop() must either return undefined, or an object that represents the drop result. ' +
          'Instead received %s.',
          dropResult
        );
      }
      return dropResult;
    } else {
      return super.drop(monitor, id);
    }
  }
}