import { DragSource } from 'dnd-core';
import invariant from 'invariant';
import isObject from 'lodash/lang/isObject';

export default class ComponentDragSource extends DragSource {
  constructor(type, spec, props, getComponentRef) {
    super();

    invariant(
      typeof type === 'string' || typeof type === 'symbol',
      'Expected type to be a string or a symbol.'
    );
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
    return this.spec.beginDrag.call(null, this.props, monitor, component, id);
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