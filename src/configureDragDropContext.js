import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';
import invariant from 'invariant';

export default function configureDragDropContext(backendFactory) {
  // Auto-detect ES6 default export for people still using ES5
  if (typeof backendFactory === 'object' && typeof backendFactory.default === 'function') {
    backendFactory = backendFactory.default;
  }
  invariant(
    typeof backendFactory === 'function',
    'Expected the backend to be a function or an ES6 module exporting a default function.'
  );

  const childContext = {
    dragDropManager: new DragDropManager(backendFactory)
  };

  return DecoratedComponent => class DragDropContext extends Component {
    static childContextTypes = {
      dragDropManager: PropTypes.object.isRequired
    };

    getChildContext() {
      return childContext;
    }

    render() {
      return <DecoratedComponent {...this.props} />;
    }
  };
}