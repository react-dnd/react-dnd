import React, { Component, PropTypes } from 'react';
import ComponentDragSource from './ComponentDragSource';
import ComponentDropTarget from './ComponentDropTarget';
import ComponentHandlerMap from './ComponentHandlerMap';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import assign from 'lodash/object/assign';
import invariant from 'invariant';

const DEFAULT_KEY = '__default__';

export default function configureDragDrop(configure, collect, {
  arePropsEqual = shallowEqualScalar,
  managerKey = 'dragDropManager'
}: options = {}) {
  return DecoratedComponent => class DragDropHandler extends Component {
    static contextTypes = {
      [managerKey]: PropTypes.object.isRequired
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

      this.manager = context[managerKey];
      invariant(this.manager, 'Could not read manager from context.');

      const handlers = this.getNextHandlers(props);
      this.handlerMap = new ComponentHandlerMap(this.manager, handlers, this.handleChange);
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
      let handlerMonitors = this.handlerMap.getHandlerMonitors();

      if (typeof handlerMonitors[DEFAULT_KEY] !== 'undefined') {
        handlerMonitors = handlerMonitors[DEFAULT_KEY];
      }

      const monitor = this.manager.getMonitor();
      return collect(handlerMonitors, monitor);
    }

    render() {
      return (
        <DecoratedComponent {...this.props}
                            {...this.state}
                            ref={this.setComponentRef} />
      );
    }
  };
}