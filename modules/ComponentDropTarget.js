'use strict';

import { DropTarget } from 'dnd-core';

export default class ComponentDropTarget extends DropTarget {
  getProps() {
    return this.props;
  }

  receiveProps(props) {
    this.props = props;
  }
}