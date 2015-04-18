'use strict';

import React, { Component } from 'react';
import { configureDragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import BoxWithImage from './BoxWithImage';
import BoxWithHandle from './BoxWithHandle';

@configureDragDropContext(HTML5Backend)
export default class Container extends Component {
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