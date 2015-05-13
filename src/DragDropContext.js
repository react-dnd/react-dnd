import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';
import invariant from 'invariant';
import checkDecoratorArguments from './utils/checkDecoratorArguments';

export default function DragDropContext(backend) {
  checkDecoratorArguments('DragDropContext', 'backend', ...arguments);

  // Auto-detect ES6 default export for people still using ES5
  if (typeof backend === 'object' && typeof backend.default === 'function') {
    backend = backend.default;
  }
  invariant(
    typeof backend === 'function',
    'Expected the backend to be a function or an ES6 module exporting a default function.'
  );

  const childContext = {
    dragDropManager: new DragDropManager(backend)
  };

  return function decorateContext(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    return class DragDropContextContainer extends Component {
      static displayName = `DragDropContext(${displayName})`;

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
  };
}