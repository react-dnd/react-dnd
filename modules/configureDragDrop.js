import React, { Component, PropTypes, findDOMNode } from 'react';
import { CompositeDisposable, SerialDisposable, Disposable } from 'rx-lite';
import ComponentDragSource from './ComponentDragSource';
import ComponentDropTarget from './ComponentDropTarget';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import assign from 'lodash/object/assign';
import memoize from 'lodash/function/memoize';
import invariant from 'react/lib/invariant';

const DEFAULT_KEY = '__default__';

export default function configureDragDrop(InnerComponent, {
  configure,
  inject,
  arePropsEqual = shallowEqualScalar,
  managerName = 'dragDropManager'
}) {
  class DragDropContainer extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return !arePropsEqual(nextProps, this.props) ||
             !shallowEqual(nextState, this.state);
    }

    constructor(props, context) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.getComponentRef = this.getComponentRef.bind(this);
      this.setComponentRef = this.setComponentRef.bind(this);

      this.manager = context[managerName];
      invariant(this.manager, 'Could not read manager from context.');

      this.handlerIds = {};
      this.handlers = {};
      this.resources = {};

      this.componentRef = null;
      this.componentConnector = this.createComponentConnector();
      this.attachHandlers(this.getNextHandlers(props));
      this.state = this.getCurrentState();
    }

    setComponentRef(ref) {
      this.componentRef = ref;
    }

    getComponentRef() {
      return this.componentRef;
    }

    componentWillMount() {
      const monitor = this.manager.getMonitor();
      monitor.addChangeListener(this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      if (arePropsEqual(nextProps, this.props)) {
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
      this.componentConnector = null;
    }

    handleChange() {
      const nextState = this.getCurrentState();
      if (!shallowEqual(nextState, this.state)) {
        this.setState(nextState);
      }
    }

    getNextHandlers(props) {
      props = assign({}, props);

      const register = {
        dragSource: (type, spec) => {
          return new ComponentDragSource(type, spec, props, this.getComponentRef);
        },
        dropTarget: (type, spec) => {
          return new ComponentDropTarget(type, spec, props, this.getComponentRef);
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
      this.handlerIds = assign({}, this.handlerIds);

      Object.keys(handlers).forEach(key => {
        this.attachHandler(key, handlers[key]);
      });
    }

    detachHandlers() {
      this.handlers = assign({}, this.handlers);
      this.handlerIds = assign({}, this.handlerIds);

      Object.keys(this.handlerIds).forEach(key => {
        this.detachHandler(key);
      });
    }

    receiveHandlers(nextHandlers) {
      this.handlers = assign({}, this.handlers);
      this.handlerIds = assign({}, this.handlerIds);

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

      let handlerId;
      if (handler instanceof ComponentDragSource) {
        handlerId = registry.addSource(handler.type, handler);
      } else if (handler instanceof ComponentDropTarget) {
        handlerId = registry.addTarget(handler.type, handler);
      } else {
        invariant(false, 'Handle is neither a source nor a target.');
      }

      this.handlerIds[key] = handlerId;
      this.handlers[key] = handler;

      this.resources[handlerId] = new CompositeDisposable();
    }

    detachHandler(key) {
      const registry = this.manager.getRegistry();
      const handlerId = this.handlerIds[key];

      if (registry.isSourceId(handlerId)) {
        registry.removeSource(handlerId);
      } else if (registry.isTargetId(handlerId)) {
        registry.removeTarget(handlerId);
      } else {
        invariant(false, 'Handle is neither a source nor a target.');
      }

      this.resources[handlerId].dispose();
      delete this.resources[handlerId];

      delete this.handlerIds[key];
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

    useResource(handlerId, disposable) {
      this.resources[handlerId].add(disposable);
      return disposable;
    }

    getCurrentState() {
      const monitor = this.manager.getMonitor();

      let handlerIds = this.handlerIds;
      if (typeof handlerIds[DEFAULT_KEY] !== 'undefined') {
        handlerIds = handlerIds[DEFAULT_KEY];
      }

      return inject(this.componentConnector, monitor, handlerIds);
    }

    createComponentConnector() {
      const backend = this.manager.getBackend();
      const backendConnector = backend.connect();
      const componentConnector = {};

      Object.keys(backendConnector).forEach(key => {
        const connectBackend = backendConnector[key].bind(backendConnector);
        const connectComponent = this.wrapConnectBackend(key, connectBackend);

        componentConnector[key] = memoize(connectComponent);
      });

      return componentConnector;
    }

    wrapConnectBackend(key, connectBackend) {
      return (handlerId) => {
        const serialDisposable = this.useResource(handlerId, new SerialDisposable());
        let currentNode = null;

        return (componentOrNode) => {
          var nextNode = findDOMNode(componentOrNode);
          if (nextNode === currentNode) {
            return;
          }

          serialDisposable.setDisposable(null);

          if (nextNode) {
            const dispose = connectBackend(handlerId, nextNode);
            serialDisposable.setDisposable(new Disposable(dispose));
            currentNode = nextNode;
          }
        };
      };
    }

    render() {
      return (
        <InnerComponent {...this.props}
                        {...this.state}
                        ref={this.setComponentRef} />
      );
    }
  }

  DragDropContainer.contextTypes = {
    [managerName]: PropTypes.object.isRequired
  };

  return DragDropContainer;
}