import invariant from 'invariant';
import isPlainObject from 'lodash/lang/isPlainObject';
import isValidType from './utils/isValidType';

const ALLOWED_SPEC_METHODS = ['canDrop', 'hover', 'drop'];

export default class DropTarget {
  constructor(type, spec, props, getInstance) {
    if (process.env.NODE_ENV !== 'production') {
      invariant(
        isValidType(type, true),
        'Expected the drop target type to either be a string, a symbol, ' +
        'or an array of either. Instead received %s.',
        type
      );
      invariant(
        isPlainObject(spec),
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
    this.getInstance = getInstance;
  }

  receive(handler) {
    if (!(handler instanceof DropTarget)) {
      return false;
    }

    if (this.type !== handler.type) {
      return false;
    }

    this.spec = handler.spec;
    this.props = handler.props;
    this.getInstance = handler.getInstance;
    return true;
  }

  canDrop(monitor, id) {
    if (!this.spec.canDrop) {
      return true;
    }

    return this.spec.canDrop.call(null, this.props, monitor);
  }

  hover(monitor, id) {
    if (!this.spec.hover) {
      return;
    }

    const component = this.getInstance();
    this.spec.hover.call(null, this.props, monitor, component, id);
  }

  drop(monitor, id) {
    if (!this.spec.drop) {
      return;
    }

    const component = this.getInstance();
    const dropResult = this.spec.drop.call(null, this.props, monitor, component, id);
    if (process.env.NODE_ENV !== 'production') {
      invariant(
        typeof dropResult === 'undefined' ||
        isPlainObject(dropResult),
        'drop() must either return undefined, or an object that represents the drop result. ' +
        'Instead received %s.',
        dropResult
      );
    }
    return dropResult;
  }
}