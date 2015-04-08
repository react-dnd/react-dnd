'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDropContext, DragDropContext, HTML5Backend } from 'react-dnd';
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

export default configureDragDropContext(Container, {
  backend: HTML5Backend
});