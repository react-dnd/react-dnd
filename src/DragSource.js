import invariant from 'invariant';
import isPlainObject from 'lodash/lang/isPlainObject';
import isValidType from './utils/isValidType';

const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'canDrag', 'isDragging', 'endDrag'];
const REQUIRED_SPEC_METHODS = ['beginDrag'];

export default class DragSource {
  constructor(type, spec, props, getInstance) {
    if (process.env.NODE_ENV !== 'production') {
      invariant(
        isValidType(type),
        'Expected the drag source type to either be a string or a symbol. ' +
        'Instead received %s.',
        type
      );

      invariant(
        isPlainObject(spec),
        'Expected the drag source specification to be a plain object. ' +
        'Instead received %s.',
        spec
      );
      Object.keys(spec).forEach(key => {
        invariant(
          ALLOWED_SPEC_METHODS.indexOf(key) > -1,
          'Expected the drag source specification to only have ' +
          'some of the following keys: %s. ' +
          'Instead received a specification with an unexpected "%s" key.',
          ALLOWED_SPEC_METHODS.join(', '),
          key
        );
        invariant(
          typeof spec[key] === 'function',
          'Expected %s in the drag source specification to be a function. ' +
          'Instead received a specification with %s: %s.',
          key,
          key,
          spec[key]
        );
      });
      REQUIRED_SPEC_METHODS.forEach(key => {
        invariant(
          typeof spec[key] === 'function',
          'Expected %s in the drag source specification to be a function. ' +
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
    if (!(handler instanceof DragSource)) {
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

  canDrag(monitor, id) {
    if (!this.spec.canDrag) {
      return true;
    }

    return this.spec.canDrag.call(null, this.props, monitor);
  }

  isDragging(monitor, id) {
    if (!this.spec.isDragging) {
      return id === monitor.getSourceId();
    }

    return this.spec.isDragging.call(null, this.props, monitor);
  }

  beginDrag(monitor, id) {
    const component = this.getInstance();
    const item = this.spec.beginDrag.call(null, this.props, monitor, component, id);
    if (process.env.NODE_ENV !== 'production') {
      invariant(
        isPlainObject(item),
        'beginDrag() must return a plain object that represents the dragged item. ' +
        'Instead received %s.',
        item
      );
    }
    return item;
  }

  endDrag(monitor, id) {
    if (!this.spec.endDrag) {
      return;
    }

    const component = this.getInstance();
    this.spec.endDrag.call(null, this.props, monitor, component, id);
  }
}