import { DragSource } from 'dnd-core';
import invariant from 'invariant';
import isPlainObject from 'lodash/lang/isPlainObject';
import isValidType from './utils/isValidType';

const ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'canDrag', 'isDragging', 'endDrag'];
const REQUIRED_SPEC_METHODS = ['beginDrag'];

export default class ComponentDragSource extends DragSource {
  constructor(type, spec, props, getComponentRef) {
    super();

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

  canDrag(monitor, id) {
    if (this.spec.canDrag) {
      return this.spec.canDrag.call(null, this.props, monitor);
    } else {
      return super.canDrag(monitor, id);
    }
  }

  isDragging(monitor, id) {
    if (this.spec.isDragging) {
      return this.spec.isDragging.call(null, this.props, monitor);
    } else {
      return super.isDragging(monitor, id);
    }
  }

  beginDrag(monitor, id) {
    const component = this.getComponentRef();
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
    if (this.spec.endDrag) {
      const component = this.getComponentRef();
      return this.spec.endDrag.call(null, this.props, monitor, component, id);
    } else {
      return super.endDrag(monitor, id);
    }
  }
}