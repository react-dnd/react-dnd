import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import invariant from 'invariant';
import checkDecoratorArguments from './utils/checkDecoratorArguments';

export default function configureDragDropLayer(collect, options = {}) {
  checkDecoratorArguments('configureDragDropLayer', ...arguments);
  const { arePropsEqual = shallowEqualScalar } = options;

  invariant(
    typeof collect === 'function',
    'configureDragDropLayer call is missing its only required parameter, ' +
    'a function that collects props to inject into the component.'
  );

  return DecoratedComponent => class DragDropHandler extends Component {
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

      this.manager = context.dragDropManager;
      const displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';
      invariant(
        this.manager instanceof DragDropManager,
        'Could not find the drag and drop manager in the context of %s. ' +
        'Make sure to wrap the top-level component of your app with configureDragDropContext. ' +
        'Read more: https://gist.github.com/gaearon/7d6d01748b772fda824e',
        displayName,
        displayName
      );

      this.state = this.getCurrentState();
    }

    componentDidMount() {
      const monitor = this.manager.getMonitor();
      this.unsubscribe = monitor.subscribeToOffsetChange(this.handleChange);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    handleChange() {
      const nextState = this.getCurrentState();
      if (!shallowEqual(nextState, this.state)) {
        this.setState(nextState);
      }
    }

    getCurrentState() {
      const monitor = this.manager.getMonitor();
      return collect(monitor);
    }

    render() {
      return (
        <DecoratedComponent {...this.props}
                            {...this.state} />
      );
    }
  };
}