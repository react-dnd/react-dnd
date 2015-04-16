'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDropContext, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import BoxWithImage from './BoxWithImage';
import BoxWithHandle from './BoxWithHandle';
import shuffle from 'lodash/collection/shuffle';

class Container extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: '2rem' }}>
          <BoxWithHandle />
          <BoxWithImage />
        </div>
      </div>
    );
  }
}

export default configureDragDropContext(Container, HTML5Backend);