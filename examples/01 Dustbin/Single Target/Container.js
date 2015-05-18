import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import Dustbin from './Dustbin';
import Box from './Box';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
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