import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';

export default function configureDragDropContext(InnerComponent, { backend, managerName = 'dragDropManager' }) {
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