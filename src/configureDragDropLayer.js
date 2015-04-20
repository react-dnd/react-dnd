import React, { Component, PropTypes } from 'react';
import shallowEqual from './utils/shallowEqual';
import shallowEqualScalar from './utils/shallowEqualScalar';
import invariant from 'invariant';

export default function configureDragDropLayer(collect, {
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

      this.manager = context[managerKey];
      invariant(this.manager, 'Could not read manager from context.');

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