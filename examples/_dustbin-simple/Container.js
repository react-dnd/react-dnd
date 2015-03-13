'use strict';

import React, { PropTypes, Component } from 'react';
import Dustbin from './Dustbin';
import Box from './Box';
import { HTML5Backend } from 'react-dnd';
import { DragDropManager } from 'dnd-core';

const manager = new DragDropManager(HTML5Backend);

const childContextTypes = {
  dnd: PropTypes.object.isRequired
};

export default class Container extends Component {
  getChildContext() {
    return {
      dnd: manager
    };
  }

  render() {
    return (
      <div>
        <Dustbin />
        <div style={{ marginTop: '2rem' }}>
          <Box name='Glass' />
          <Box name='Banana' />
          <Box name='Paper' />
        </div>
      </div>
    );
  }
}

Container.childContextTypes = childContextTypes;
