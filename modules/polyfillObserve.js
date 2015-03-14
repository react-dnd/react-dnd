'use strict';

import React, { Component } from 'react';

export default function polyfillObserve(ComposedComponent) {
  return class extends Component {
    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
}