'use strict';

import React, { Component, PropTypes, findDOMNode } from 'react';
import { DragSource, DropTarget } from 'dnd-core';
import assign from 'lodash/object/assign';
import invariant from 'react/lib/invariant';

const REGISTRY_FIELD = `_registry${Math.random() * 10}`;
const OWNER_FIELD = `_owner${Math.random() * 10}`;

class ComponentDragSource extends DragSource {
  constructor(owner, registry) {
    this[REGISTRY_FIELD] = registry;
    this[OWNER_FIELD] = owner;
  }

  isDragging(monitor) {
    const registry = this[REGISTRY_FIELD];
    const source = registry.getSource(monitor.getSourceHandle(), true);
    return source[OWNER_FIELD] === this[OWNER_FIELD];
  }
}

export default function configureDragDrop(InnerComponent, registerHandlers, pickProps) {
  class DragDropContainer extends Component {
    constructor(props, context) {
      super(props);
      this.handles = {};

      this.manager = context.dragDrop;
      this.attachHandlers(props);
      this.state = this.getCurrentState();
    }

    componentWillMount() {
      const monitor = this.manager.getMonitor();
      monitor.addChangeListener(this.handleChange, this);
    }

    componentWillReceiveProps(nextProps) {
      this.detachHandlers();
      this.attachHandlers(nextProps);
      this.handleChange();
    }

    componentWillUnmount() {
      const monitor = this.manager.getMonitor();
      monitor.removeChangeListener(this.handleChange, this);
      this.detachHandlers();
    }

    handleChange() {
      this.setState(this.getCurrentState());
    }

    detachHandlers() {
      const registry = this.manager.getRegistry();

      Object.keys(this.handles).forEach(key => {
        const handle = this.handles[key];

        if (registry.isSourceHandle(handle)) {
          registry.removeSource(handle);
        } else if (registry.isTargetHandle(handle)) {
          registry.removeTarget(handle);
        } else {
          invariant(false, 'Handle is neither a source nor a target.');
        }
      });

      this.handles = {};
    }

    attachHandlers(props) {
      const registry = this.manager.getRegistry();
      const owner = this;

      this.handles = registerHandlers({
        dragSource(type, handler) {
          handler = assign(new ComponentDragSource(owner, registry), handler);
          return registry.addSource(type, handler);
        },

        dropTarget(type, handler) {
          handler = assign(new DropTarget(), handler);
          return registry.addTarget(type, handler);
        }
      }, props);
    }

    getCurrentState() {
      const monitor = this.manager.getMonitor();
      const backend = this.manager.getBackend();
      const registry = this.manager.getRegistry();

      function attach(handle, ref) {
        const node = findDOMNode(ref);

        if (registry.isSourceHandle(handle)) {
          backend.updateSourceNode(handle, node);
        } else if (registry.isTargetHandle(handle)) {
          backend.updateTargetNode(handle, node);
        } else {
          invariant(false, 'Handle is neither a source nor a target.');
        }
      }

      return pickProps(attach, monitor, this.handles);
    }

    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  DragDropContainer.contextTypes = {
    dragDrop: PropTypes.object.isRequired
  };

  return DragDropContainer;
}