'use strict';

import { DragSource } from 'dnd-core';

export default class ComponentDragSource extends DragSource {
  getProps() {
    return this.props;
  }

  receiveProps(props) {
    this.props = props;
  }
}