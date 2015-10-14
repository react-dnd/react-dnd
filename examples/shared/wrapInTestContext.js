import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';

export default function wrapInTestContext(DecoratedComponent) {
  class TestStub extends Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }

  return DragDropContext(TestBackend)(TestStub);
}