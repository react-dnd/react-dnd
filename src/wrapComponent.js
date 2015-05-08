import React, { Component, PropTypes } from 'react';
import { Disposable, CompositeDisposable, SerialDisposable } from 'disposables';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import invariant from 'invariant';
import createBackendConnector from './createBackendConnector';

export default function wrapComponent({
  DecoratedComponent,
  createHandler,
  createMonitor,
  connectBackend,
  registerHandler,
  wrapDisplayName,
  getType,
  collect
}) {
  const displayName = wrapDisplayName(
    DecoratedComponent.displayName ||
    DecoratedComponent.name ||
    'Component'
  );

  return class DragDropContainer extends Component {
    static displayName = displayName;

    static contextTypes = {
      dragDropManager: PropTypes.object.isRequired
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqualScalar(nextProps, this.props) ||
             !shallowEqual(nextState, this.state);
    }

    getInstance() {
      return this.refs.child;
    }

    constructor(props, context) {
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.handleChildRef = this.handleChildRef.bind(this);

      invariant(
        typeof this.context.dragDropManager === 'object',
        'Could not find the drag and drop manager in the context of %s. ' +
        'Make sure to wrap the top-level component of your app with DragDropContext. ' +
        'Read more: https://gist.github.com/gaearon/7d6d01748b772fda824e',
        displayName,
        displayName
      );

      this.manager = this.context.dragDropManager;
      this.monitor = createMonitor(this.manager);
      this.handler = createHandler(this.monitor);
      this.disposable = new SerialDisposable();

      this.receiveProps(props);
      this.state = this.getCurrentState();
    }

    componentWillReceiveProps(nextProps) {
      if (!shallowEqualScalar(nextProps, this.props)) {
        this.receiveProps(nextProps);
        this.handleChange();
      }
    }

    componentWillUnmount() {
      this.disposable.dispose();
    }

    receiveProps(props) {
      this.handler.receiveProps(props);
      this.receiveType(getType(props));
    }

    receiveType(type) {
      if (type === this.currentType) {
        return;
      }

      this.currentType = type;

      const {
        handlerId,
        unregister
      } = registerHandler(
        type,
        this.handler,
        this.manager
      );

      const {
        connector,
        disposable: connectorDisposable
      } = createBackendConnector(
        handlerId,
        connectBackend,
        this.manager
      );

      const globalMonitor = this.manager.getMonitor();
      const unsubscribe = globalMonitor.subscribeToStateChange(
        this.handleChange,
        { handlerIds: [handlerId] }
      );

      this.disposable.setDisposable(
        new CompositeDisposable(
          new Disposable(unregister),
          new Disposable(unsubscribe),
          connectorDisposable
        )
      );

      this.monitor.receiveHandlerId(handlerId);
      this.connector = connector;
    }

    handleChange() {
      const nextState = this.getCurrentState();
      if (!shallowEqual(nextState, this.state)) {
        this.setState(nextState);
      }
    }

    handleChildRef(component) {
      this.handler.receiveComponent(component);
    }

    getCurrentState() {
      return collect(this.connector, this.monitor);
    }

    render() {
      return (
        <DecoratedComponent {...this.props}
                            {...this.state}
                            ref={this.handleChildRef} />
      );
    }
  };
}