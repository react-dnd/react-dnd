'use strict';

import { Component, PropTypes } from 'react';

export default function configureDragDrop(InnerComponent, registerHandlers, pickProps) {
  class DragDropContainer extends Component {
    constructor(props, context) {
      super(props, context);

      //const manager = context.dragDrop;
      this.state = {
        // TODO
      };
    }

    render() {
      return <InnerComponent {...this.props} {...this.state} />;
    }
  }

  DragDropContainer.contextTypes = {
    dragDrop: PropTypes.object.isRequired
  };

  return DragDropContainer;
}