'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDropContext, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Dustbin from './Dustbin';
import Box from './Box';
import shuffle from 'lodash/collection/shuffle';

class Container extends Component {
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

export default configureDragDropContext(Container, HTML5Backend);