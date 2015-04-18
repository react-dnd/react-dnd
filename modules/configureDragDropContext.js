import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';

function configureDragDropContext(InnerComponent, backendFactories) {
  const childContextTypes = {};
  const childContext = {};

  if (typeof backendFactories === 'function') {
    backendFactories = {
      dragDropManager: backendFactories
    };
  }

  Object.keys(backendFactories).forEach(key => {
    childContextTypes[key] = PropTypes.object.isRequired;
    childContext[key] = new DragDropManager(backendFactories[key]);
  });

  class DragDropContext extends Component {
    static childContextTypes = childContextTypes;

    getChildContext() {
      return childContext;
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  return DragDropContext;
}

export default function(...args) {
  if (args.length === 1) {
    return (DecoratedComponent) => configureDragDropContext(DecoratedComponent, ...args);
  } else {
    return configureDragDropContext(...args);
  }
}