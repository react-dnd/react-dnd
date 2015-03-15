'use strict';

import React, { Component } from 'react';

export default function polyfillObserve(ComposedComponent, observe) {
  const Enhancer = class extends Component {
    constructor(props, context) {
      super(props, context);

      this.subscriptions = {};
      this.state = { data: {} };

      this.resubscribe(props, context);
    }

    componentWillReceiveProps(props, context) {
      this.resubscribe(props, context);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    resubscribe(props, context) {
      const newObservables = observe(props, context);
      const newSubscriptions = {};

      for (let key in newObservables) {
        newSubscriptions[key] = newObservables[key].subscribe({
          onNext: (value) => {
            this.state.data[key] = value;
            this.setState({ data: this.state.data });
          },
          onError: () => {},
          onCompleted: () => {}
        });
      }

      this.unsubscribe();
      this.subscriptions = newSubscriptions;
    }

    unsubscribe() {
      for (let key in this.subscriptions) {
        if (this.subscriptions.hasOwnProperty(key)) {
          this.subscriptions[key].dispose();
        }
      }

      this.subscriptions = {};
    }

    render() {
      return <ComposedComponent {...this.props} data={this.state.data} />;
    }
  };

  Enhancer.propTypes = ComposedComponent.propTypes;
  Enhancer.contextTypes = ComposedComponent.contextTypes;

  return Enhancer;
}