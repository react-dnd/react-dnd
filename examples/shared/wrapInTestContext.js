import React, { Component } from 'react';
import TestBackend from 'react-dnd/modules/backends/Test';
import { DragDropContext } from 'react-dnd';

export default function wrapInTestContext(DecoratedComponent) {
  @DragDropContext(TestBackend)
  class TestStub extends Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }

  return TestStub;
}