import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import BoxWithImage from './BoxWithImage';
import BoxWithHandle from './BoxWithHandle';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  render() {
    return (
      <div>
        <div style={{ marginTop: '1.5rem' }}>
          <BoxWithHandle />
          <BoxWithImage />
        </div>
      </div>
    );
  }
}