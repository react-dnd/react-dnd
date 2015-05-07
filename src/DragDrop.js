import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';
import DragSource from './DragSource';
import DropTarget from './DropTarget';
import HandlerMap from './HandlerMap';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import assign from 'lodash/object/assign';
import invariant from 'invariant';
import checkDecoratorArguments from './utils/checkDecoratorArguments';
import isPlainObject from 'lodash/lang/isPlainObject';

const DEFAULT_KEY = '__default__';

function isDragDropHandler(obj) {
  return obj instanceof DragSource ||
         obj instanceof DropTarget;
}

export default function DragDrop(configure, collect, options = {}) {
  checkDecoratorArguments('DragDrop', ...arguments);
  const { arePropsEqual = shallowEqualScalar } = options;

  invariant(
    typeof configure === 'function',
    'DragDrop call is missing its first required parameter, ' +
    'a function that registers drag sources and/or drop targets. ' +
    'Instead received %s.',
    configure
  );
  invariant(
    typeof collect === 'function',
    'DragDrop call is missing its second required parameter, ' +
    'a function that collects props to inject into the component. ' +
    'Instead received %s.',
    collect
  );

  return function createDragDropContainer(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    return class DragDropContainer extends Component {
      static displayName = `DragDrop(${displayName})`;

      static contextTypes = {
        dragDropManager: PropTypes.object.isRequired
      }

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

        this.manager = context.dragDropManager;
        invariant(
          this.manager instanceof DragDropManager,
          'Could not find the drag and drop manager in the context of %s. ' +
          'Make sure to wrap the top-level component of your app with DragDropContext. ' +
          'Read more: https://gist.github.com/gaearon/7d6d01748b772fda824e',
          displayName,
          displayName
        );

        const handlers = this.getNextHandlers(props);
        this.handlerMap = new HandlerMap(this.manager, handlers, this.handleChange);
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
            return new DragSource(type, spec, props, this.getComponentRef);
          },
          dropTarget: (type, spec) => {
            return new DropTarget(type, spec, props, this.getComponentRef);
          }
        };

        const handlers = configure(register, props);
        const wrappedHandlers = isDragDropHandler(handlers) ? {
          [DEFAULT_KEY]: handlers
        } : handlers;

        if (process.env.NODE_ENV !== 'production') {
          invariant(
            wrappedHandlers != null &&
            typeof wrappedHandlers === 'object' &&
            Object.keys(wrappedHandlers).every(key =>
              isDragDropHandler(wrappedHandlers[key])
            ),
            'Expected the first argument to DragDrop for %s to ' +
            'either return the result of calling register.dragSource() ' +
            'or register.dropTarget(), or an object containing only such values. ' +
            'Instead received %s. ' +
            'Read more: https://gist.github.com/gaearon/9222a74aaf82ad65fd2e',
            displayName,
            handlers
          );
        }

        return wrappedHandlers;
      }

      getCurrentState() {
        const wrappedHandlerMonitors = this.handlerMap.getHandlerMonitors();
        const handlerMonitors = typeof wrappedHandlerMonitors[DEFAULT_KEY] !== 'undefined' ?
          wrappedHandlerMonitors[DEFAULT_KEY] :
          wrappedHandlerMonitors;

        const monitor = this.manager.getMonitor();
        const propsToInject = collect(handlerMonitors, monitor);
        if (process.env.NODE_ENV !== 'production') {
          invariant(
            isPlainObject(propsToInject),
            'Expected the second argument to DragDrop for %s ' +
            'to return a plain object of props to inject into %s. ' +
            'Instead received %s.',
            displayName,
            displayName,
            propsToInject
          );
        }
        return propsToInject;
      }

      render() {
        return (
          <DecoratedComponent {...this.props}
                              {...this.state}
                              ref={this.setComponentRef} />
        );
      }
    };
  };
}