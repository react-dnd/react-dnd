'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDropContext, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Box from './Box';
import Target from './Target';
import shuffle from 'lodash/collection/shuffle';

class Container extends Component {
  render() {
    return (
      <div style={{ height: 200 }}>
        <div style={{ float: 'left', marginTop: 20 }}>
          <Box showCopyIcon />
          <Box />
        </div>
        <div style={{ float: 'left', marginLeft: 100 }}>
          <Target />
        </div>
      </div>
    );
  }
}

export default configureDragDropContext(Container, HTML5Backend);