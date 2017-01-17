import React, { Component, PropTypes, Children } from 'react';
import { DragDropManager } from 'dnd-core';
import invariant from 'invariant';
import checkDecoratorArguments from './utils/checkDecoratorArguments';
import hoistStatics from 'hoist-non-react-statics';

const CHILD_CONTEXT_TYPES = {
  dragDropManager: PropTypes.object.isRequired
};

const createChildContext = (backend, window) => ({
  dragDropManager: new DragDropManager(backend, window),
});

const unpackBackendForEs5Users = (backendOrModule) => {
  // Auto-detect ES6 default export for people still using ES5
  let backend = backendOrModule;
  if (typeof backend === 'object' && typeof backend.default === 'function') {
    backend = backend.default;
  }
  invariant(
    typeof backend === 'function',
    'Expected the backend to be a function or an ES6 module exporting a default function. ' +
    'Read more: http://gaearon.github.io/react-dnd/docs-drag-drop-context.html'
  );
  return backend;
};

export class DragDropContextProvider extends Component {
  static propTypes = {
    backend: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    children: PropTypes.element.isRequired
  };

  static childContextTypes = CHILD_CONTEXT_TYPES;

  static displayName = 'DragDropContextProvider';

  static contextTypes = {
    window: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.backend = unpackBackendForEs5Users(props.backend);
  }

  getChildContext() {
    const { window } = this.context;
    return createChildContext(this.backend, window);
  }

  render() {
    return Children.only(this.props.children);
  }
}

export default function DragDropContext(backendOrModule) {
  checkDecoratorArguments('DragDropContext', 'backend', ...arguments);

  const backend = unpackBackendForEs5Users(backendOrModule);
  const childContext = createChildContext(backend, window);

  return function decorateContext(DecoratedComponent) {
    const displayName =
      DecoratedComponent.displayName ||
      DecoratedComponent.name ||
      'Component';

    class DragDropContextContainer extends Component {
      static DecoratedComponent = DecoratedComponent;

      static displayName = `DragDropContext(${displayName})`;

      static childContextTypes = CHILD_CONTEXT_TYPES;

      getDecoratedComponentInstance() {
        return this.refs.child;
      }

      getManager() {
        return childContext.dragDropManager;
      }

      getChildContext() {
        return childContext;
      }

      render() {
        return (
          <DecoratedComponent {...this.props}
                              ref='child' />
        );
      }
    }

    return hoistStatics(DragDropContextContainer, DecoratedComponent);
  };
}
