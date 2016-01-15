import React, { Component, PropTypes } from 'react';
import { Disposable, CompositeDisposable, SerialDisposable } from 'disposables';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import isEqual from 'lodash/lang/isEqual';
import isPlainObject from 'lodash/lang/isPlainObject';
import invariant from 'invariant';
import bindConnector from './bindConnector';

export default function decorateHandler({
  DecoratedComponent,
  createHandler,
  createMonitor,
  createConnector,
  registerHandler,
  containerDisplayName,
  getType,
  collect,
  options
}) {
  const { arePropsEqual = shallowEqualScalar } = options;
  const displayName =
    DecoratedComponent.displayName ||
    DecoratedComponent.name ||
    'Component';

  return class DragDropContainer extends Component {
    static DecoratedComponent = DecoratedComponent;

    static displayName = `${containerDisplayName}(${displayName})`;

    static contextTypes = {
      dragDropManager: PropTypes.object.isRequired
    }

    getHandlerId() {
      return this.handlerId;
    }

    getDecoratedComponentInstance() {
      return this.decoratedComponentInstance;
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !arePropsEqual(nextProps, this.props) ||
             !shallowEqual(nextState, this.state);
    }

    constructor(props, context) {
      super(props, context);
      this.handleChange = this.handleChange.bind(this);
      this.handleChildRef = this.handleChildRef.bind(this);

      invariant(
        typeof this.context.dragDropManager === 'object',
        'Could not find the drag and drop manager in the context of %s. ' +
        'Make sure to wrap the top-level component of your app with DragDropContext. ' +
        'Read more: http://gaearon.github.io/react-dnd/docs-troubleshooting.html#could-not-find-the-drag-and-drop-manager-in-the-context',
        displayName,
        displayName
      );

      this.manager = this.context.dragDropManager;
      this.handlerMonitor = createMonitor(this.manager);
      this.handler = createHandler(this.handlerMonitor);
      this.disposable = new SerialDisposable();

      this.receiveProps(props);
      this.state = this.getCurrentState();
    }

    componentWillReceiveProps(nextProps) {
      if (!arePropsEqual(nextProps, this.props)) {
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
      if (type === this.currentType || 
          Array.isArray(type) && Array.isArray(this.currentType) && isEqual(type.slice().sort(), this.currentType.slice().sort())) {
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

      const connector = createConnector(this.manager.getBackend());
      const {
        handlerConnector,
        disposable: connectorDisposable
      } = bindConnector(connector, handlerId);

      this.handlerId = handlerId;
      this.handlerConnector = handlerConnector;
      this.handlerMonitor.receiveHandlerId(handlerId);

      const globalMonitor = this.manager.getMonitor();
      const unsubscribe = globalMonitor.subscribeToStateChange(
        this.handleChange,
        { handlerIds: [handlerId] }
      );

      this.disposable.setDisposable(
        new CompositeDisposable(
          new Disposable(unsubscribe),
          new Disposable(unregister),
          connectorDisposable
        )
      );
    }

    handleChange() {
      const nextState = this.getCurrentState();
      if (!shallowEqual(nextState, this.state)) {
        this.setState(nextState);
      }
    }

    handleChildRef(component) {
      this.decoratedComponentInstance = component;
      this.handler.receiveComponent(component);
    }

    getCurrentState() {
      const nextState = collect(this.handlerConnector, this.handlerMonitor);
      if (process.env.NODE_ENV !== 'production') {
        invariant(
          isPlainObject(nextState),
          'Expected `collect` specified as the second argument to ' +
          '%s for %s to return a plain object of props to inject. ' +
          'Instead, received %s.',
          containerDisplayName,
          displayName,
          nextState
        );
      }
      return nextState;
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