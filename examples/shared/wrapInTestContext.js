import React, { Component } from 'react';
import { createTestBackend } from 'dnd-core';
import { DragDropContext } from 'react-dnd';

export default function wrapInTestContext(DecoratedComponent) {
  @DragDropContext(createTestBackend)
  class TestStub extends Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }

  return TestStub;
}