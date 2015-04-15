import React, { Component, PropTypes, findDOMNode } from 'react';
import { Disposable, CompositeDisposable, SerialDisposable } from 'disposables';
import ComponentDragSource from './ComponentDragSource';
import ComponentDropTarget from './ComponentDropTarget';
import ComponentHandlerMap from './ComponentHandlerMap';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import assign from 'lodash/object/assign';
import memoize from 'lodash/function/memoize';
import invariant from 'invariant';

const DEFAULT_KEY = '__default__';

export default function configureDragDrop(InnerComponent, {
  configure,
  collect,
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
      this.componentRef = null;

      this.manager = context[managerName];
      invariant(this.manager, 'Could not read manager from context.');

      this.componentConnector = this.createComponentConnector();
      this.handlerMap = new ComponentHandlerMap(
        this.manager.getRegistry(),
        this.manager.getMonitor(),
        this.getNextHandlers(props),
        this.handleChange
      );
      this.state = this.getCurrentState();
    }

    setComponentRef(ref) {
      this.componentRef = ref;
    }

    getComponentRef() {
      return this.componentRef;
    }

    componentWillReceiveProps(nextProps) {
      if (!arePropsEqual(nextProps, this.props)) {
        const nextHandlers = this.getNextHandlers(nextProps);
        this.handlerMap.receiveHandlers(nextHandlers);
        this.handleChange();
      }
    }

    componentWillUnmount() {
      const disposable = this.handlerMap.getDisposable();
      disposable.dispose();
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
      if (handlers instanceof ComponentDragSource || handlers instanceof ComponentDropTarget) {
        handlers = { [DEFAULT_KEY]: handlers };
      }

      return handlers;
    }

    getCurrentState() {
      const monitor = this.manager.getMonitor();
      let handlerIds = this.handlerMap.getHandlerIds();

      if (typeof handlerIds[DEFAULT_KEY] !== 'undefined') {
        handlerIds = handlerIds[DEFAULT_KEY];
      }

      return collect(this.componentConnector, monitor, handlerIds);
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
        const nodeDisposable = new SerialDisposable();
        this.handlerMap.addDisposable(handlerId, nodeDisposable);

        let currentNode = null;
        let currentOptions = null;

        return (nextComponentOrNode, nextOptions) => {
          const nextNode = findDOMNode(nextComponentOrNode);
          if (nextNode === currentNode && shallowEqualScalar(currentOptions, nextOptions)) {
            return;
          }

          currentNode = nextNode;
          currentOptions = nextOptions;

          if (nextNode) {
            const nextDispose = connectBackend(handlerId, nextNode, nextOptions);
            nodeDisposable.setDisposable(new Disposable(nextDispose));
          } else {
            nodeDisposable.setDisposable(null);
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