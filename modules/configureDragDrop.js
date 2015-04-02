import React, { Component, PropTypes, findDOMNode } from 'react';
import ComponentDragSource from './ComponentDragSource';
import ComponentDropTarget from './ComponentDropTarget';
import assign from 'lodash/object/assign';
import memoize from 'lodash/function/memoize';
import invariant from 'react/lib/invariant';
import shallowEqual from 'react/lib/shallowEqual';

const DEFAULT_KEY = '__default__';

export default function configureDragDrop(InnerComponent, { configure, inject, managerName = 'dragDropManager' }) {
  class DragDropContainer extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(nextProps, this.props) ||
             !shallowEqual(nextState, this.state);
    }

    constructor(props, context) {
      super(props);
      this.handleChange = this.handleChange.bind(this);

      this.manager = context[managerName];
      invariant(this.manager, 'Could not read manager from context.');

      this.handles = {};
      this.handlers = {};

      this.connector = this.createConnector();
      this.attachHandlers(this.getNextHandlers(props));
      this.state = this.getCurrentState();
    }

    componentWillMount() {
      const monitor = this.manager.getMonitor();
      monitor.addChangeListener(this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      if (shallowEqual(nextProps, this.props)) {
        return;
      }

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
      this.connector = null;
    }

    handleChange() {
      const nextState = this.getCurrentState();
      if (!shallowEqual(nextState, this.state)) {
        this.setState(nextState);
      }
    }

    getNextHandlers(props) {
      const register = {
        dragSource(type, spec) {
          return new ComponentDragSource(type, spec, props);
        },
        dropTarget(type, spec) {
          return new ComponentDropTarget(type, spec, props);
        }
      };

      let handlers = configure(register, props);
      if (handlers instanceof ComponentDragSource ||
          handlers instanceof ComponentDropTarget) {

        handlers = {
          [DEFAULT_KEY]: handlers
        };
      }

      return handlers;
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

      let handles = this.handles;
      if (handles[DEFAULT_KEY]) {
        handles = handles[DEFAULT_KEY];
      }

      return inject(this.connector, monitor, handles);
    }

    createConnector() {
      const backend = this.manager.getBackend();
      const connector = backend.getConnector();
      const wrappedConnector = {};

      Object.keys(connector).forEach(function (key) {
        wrappedConnector[key] = memoize(handle => componentOrNode =>
          connector[key].call(connector, handle, findDOMNode(componentOrNode))
        );
      });

      return wrappedConnector;
    }

    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  DragDropContainer.contextTypes = {
    [managerName]: PropTypes.object.isRequired
  };

  return DragDropContainer;
}