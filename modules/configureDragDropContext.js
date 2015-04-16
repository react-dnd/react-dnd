import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';

export default function configureDragDropContext(InnerComponent, options) {
  if (typeof options === 'function') {
    options = { backend: options };
  }

  const { backend, managerName = 'dragDropManager' } = options;
  const manager = new DragDropManager(backend);

  class DragDropContext extends Component {
    getChildContext() {
      return {
        [managerName]: manager
      };
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  DragDropContext.childContextTypes = {
    [managerName]: PropTypes.object.isRequired
  };

  return DragDropContext;
}