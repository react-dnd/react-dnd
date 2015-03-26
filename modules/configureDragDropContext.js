import React, { Component, PropTypes } from 'react';
import { DragDropManager } from 'dnd-core';

export default function configureDragDropContext(InnerComponent, Backend, contextProp = 'dragDropManager') {
  const manager = new DragDropManager(Backend);

  class DragDropContext extends Component {
    getChildContext() {
      return {
        [contextProp]: manager
      };
    }

    render() {
      return <InnerComponent {...this.props} />;
    }
  }

  DragDropContext.childContextTypes = {
    [contextProp]: PropTypes.object.isRequired
  };

  return DragDropContext;
}