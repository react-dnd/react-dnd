'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDropContext, DragDropContext, HTML5Backend } from 'react-dnd';
import Dustbin from './Dustbin';
import Box from './Box';
import shuffle from 'lodash/collection/shuffle';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: ['Glass', 'Banana', 'Paper']
    };
  }

  render() {
    return (
      <div>
        <Dustbin />
        <div style={{ marginTop: '2rem' }}>
          {this.state.boxes.map((name, index) =>
            <Box name={name}
                 key={index} />
          )}
        </div>
      </div>
    );
  }
}

export default configureDragDropContext(Container, {
  backend: HTML5Backend
});