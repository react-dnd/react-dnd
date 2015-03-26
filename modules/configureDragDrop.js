import React, { Component, PropTypes, findDOMNode } from 'react';
import ComponentDragSource from './ComponentDragSource';
import ComponentDropTarget from './ComponentDropTarget';
import assign from 'lodash/object/assign';
import invariant from 'react/lib/invariant';
import shallowEqual from 'react/lib/shallowEqual';

export default function configureDragDrop(InnerComponent, registerHandlers, pickProps) {
  class DragDropContainer extends Component {
    constructor(props, context) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
      this.manager = context.dragDrop;
      this.handles = {};
      this.handlers = {};

      this.attachHandlers(this.getNextHandlers(props));
      this.state = this.getCurrentState();
    }

    componentWillMount() {
      const monitor = this.manager.getMonitor();
      monitor.addChangeListener(this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      const monitor = this.manager.getMonitor();

      monitor.removeChangeListener(this.handleChange);
      this.receiveHandlers(this.getNextHandlers(nextProps));
      monitor.addChangeListener(this.handleChange);

      this.handleChange();
    }

    componentWillUnmount() {
      const monitor = this.manager.getMonitor();
      monitor.removeChangeListener(this.handleChange);
      this.detachHandlers();
    }

    handleChange() {
      const nextState = this.getCurrentState();
      if (!shallowEqual(nextState, this.state)) {
        this.setState(nextState);
      }
    }

    getNextHandlers(props) {
      return registerHandlers(props, {
        dragSource(type, spec) {
          return new ComponentDragSource(type, spec);
        },

        dropTarget(type, spec) {
          return new ComponentDropTarget(type, spec);
        }
      });
    }

    attachHandlers(handlers) {
      this.handlers = assign({}, this.handlers);
      this.handles = assign({}, this.handles);

      Object.keys(handlers).forEach(key => {
        this.attachHandler(key, handlers[key]);
      });
    }

    detachHandlers() {
      this.handlers = assign({}, this.handlers);
      this.handles = assign({}, this.handles);

      Object.keys(this.handles).forEach(key => {
        this.detachHandler(key);
      });
    }

    receiveHandlers(nextHandlers) {
      this.handlers = assign({}, this.handlers);
      this.handles = assign({}, this.handles);

      const keys = Object.keys(this.handlers);
      const nextKeys = Object.keys(nextHandlers);

      invariant(
        keys.every(k => nextKeys.indexOf(k) > -1) &&
        nextKeys.every(k => keys.indexOf(k) > -1) &&
        keys.length === nextKeys.length,
        'Expected handlers to have stable keys at runtime.'
      );

      keys.forEach(key => {
        this.receiveHandler(key, nextHandlers[key]);
      });
    }

    attachHandler(key, handler) {
      const registry = this.manager.getRegistry();

      if (handler instanceof ComponentDragSource) {
        this.handles[key] = registry.addSource(handler.type, handler);
      } else if (handler instanceof ComponentDropTarget) {
        this.handles[key] = registry.addTarget(handler.type, handler);
      } else {
        invariant(false, 'Handle is neither a source nor a target.');
      }

      this.handlers[key] = handler;
    }

    detachHandler(key) {
      const registry = this.manager.getRegistry();
      const handle = this.handles[key];

      if (registry.isSourceHandle(handle)) {
        registry.removeSource(handle);
      } else if (registry.isTargetHandle(handle)) {
        registry.removeTarget(handle);
      } else {
        invariant(false, 'Handle is neither a source nor a target.');
      }

      delete this.handles[key];
      delete this.handlers[key];
    }

    receiveHandler(key, nextHandler) {
      const handler = this.handlers[key];
      if (handler.receive(nextHandler)) {
        return;
      }

      this.detachHandler(key);
      this.attachHandler(key, nextHandler);
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