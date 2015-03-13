'use strict';

import React, { PropTypes, Component } from 'react';
import invariant from 'react/lib/invariant';

function registerHandles(registry, handlerDefs, addPropListener) {
  const keys = Object.keys(handlerDefs);
  const handles = {};

  keys.forEach(key => {
    const handlerDef = handlerDefs[key];
    const { source, target } = handlerDef;
    invariant(Boolean(source) !== Boolean(target), 'Must either specify source or target, but not both.');

    let handler;
    if (source) {
      handler = new source();
      handles[key] = registry.addSource(handlerDef.for, handler);
    } else {
      handler = new target();
      handles[key] = registry.addTarget(handlerDef.for, handler);
    }

    addPropListener(props => {
      handler.receiveProps(props)
    });
  });

  return handles;
}

function unregisterHandles(registry, handles, handlerDefs) {
  const keys = Object.keys(handlerDefs);

  keys.forEach(key => {
    const handler = handlerDefs[key];
    const { source } = handler;

    const handle = handles[key];
    if (source) {
      registry.removeSource(handler.for, handle);
    } else {
      registry.removeTarget(handler.for, handle);
    }
  });
}

export default function configureDragDrop(ComposedComponent, handlerDefs, getState) {
  class Wrapper extends Component {
    constructor(props, context) {
      super(props, context);

      this.handlerDefs = handlerDefs;
      this.monitor = context.dnd.getContext();
      this.registry = context.dnd.getRegistry();
      this.backend = context.dnd.getBackend();

      this.propListeners = [];
      this.handles = registerHandles(this.registry, this.handlerDefs,
        (listener) => this.propListeners.push(listener)
      );

      this.broadcastProps(props);
      this.state = this.getState();
    }

    componentWillMount() {
      this.listener = this.monitor.addChangeListener(() => this.handleChange());
    }

    componentWillReceiveProps(nextProps) {
      this.broadcastProps(nextProps);
      this.handleChange();
    }

    getState() {
      return getState(this.monitor, this.backend, this.handles);
    }

    broadcastProps(props) {
      this.propListeners.forEach(listener => listener(props));
    }

    handleChange() {
      this.setState(this.getState());
    }

    componentWillUnmount() {
      this.monitor.removeChangeListener(this.listener);
      this.propListeners = [];
      unregisterHandles(this.registry, this.handlerDefs, this.handles);
    }

    render() {
      return <ComposedComponent {...this.props} {...this.state} />;
    }
  }

  Wrapper.contextTypes = {
    dnd: PropTypes.object.isRequired
  };

  return Wrapper;
}