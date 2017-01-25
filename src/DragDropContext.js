import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';
import invariant from 'invariant';
import hoistStatics from 'hoist-non-react-statics';
import checkDecoratorArguments from './utils/checkDecoratorArguments';

export default function DragDropContext(backendOrModule) {
  checkDecoratorArguments('DragDropContext', 'backend', ...arguments); // eslint-disable-line prefer-rest-params

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
    'Read more: http://react-dnd.github.io/react-dnd/docs-drag-drop-context.html',
  );

  const childContext = {
    dragDropManager: new DragDropManager(backend),
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
        dragDropManager: PropTypes.object.isRequired,
      };

      getDecoratedComponentInstance() {
        return this.childRef;
      }

      getManager() {
        return childContext.dragDropManager;
      }

      getChildContext() {
        return childContext;
      }

      render() {
        return (
          <DecoratedComponent
            {...this.props}
            ref={e => (this.childRef = e)}
          />
        );
      }
    }

    return hoistStatics(DragDropContextContainer, DecoratedComponent);
  };
}
