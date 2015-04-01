'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDropContext, DragDropContext, HTML5Backend } from 'react-dnd';
import Box from './Box';
import shuffle from 'lodash/collection/shuffle';

class Container extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: '2rem' }}>
          <Box />
        </div>
      </div>
    );
  }
}

export default configureDragDropContext(Container, {
  backend: HTML5Backend
});