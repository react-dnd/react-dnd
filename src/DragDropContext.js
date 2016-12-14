import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';
import invariant from 'invariant';
import checkDecoratorArguments from './utils/checkDecoratorArguments';
import hoistStatics from 'hoist-non-react-statics';

export default function DragDropContext(backendOrModule, options = {}) {
  checkDecoratorArguments('DragDropContext', 'backend', ...arguments);

  const { withRef = false } = options;

  // Auto-detect ES6 default export for people still using ES5
  let backend;
  if (typeof backendOrModule === 'object' && typeof backendOrModule.default === 'function') {
    backend = backendOrModule.default;
  } else {
    backend = backendOrModule;
  }

  invariant(
    typeof backend === 'function',
    'Expected the backend to be a function or an ES6 module exporting a default function. ' +
    'Read more: http://gaearon.github.io/react-dnd/docs-drag-drop-context.html'
  );

  const childContext = {
    dragDropManager: new DragDropManager(backend)
  };

  return function decorateContext(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    class DragDropContextContainer extends Component {
      static DecoratedComponent = DecoratedComponent;

      static displayName = `DragDropContext(${displayName})`;

      static childContextTypes = {
        dragDropManager: PropTypes.object.isRequired
      };

      getDecoratedComponentInstance() {
        invariant(
          withRef,
          'To access the wrapped instance, you need to specify { withRef: true } as the second ' +
          'argument of the DragDropContext() call. The decorated component can not be stateless.'
        );
        return this.child;
      }

      getManager() {
        return childContext.dragDropManager;
      }

      getChildContext() {
        return childContext;
      }

      render() {
        const additionalProps = {};
        if (withRef) {
          additionalProps.ref = child => (this.child = child);
        }
        return (
          <DecoratedComponent {...this.props} {...additionalProps} />
        );
      }
    }

    return hoistStatics(DragDropContextContainer, DecoratedComponent);
  };
}
