'use strict';

import React, { Component } from 'react';
import Dustbin from './Dustbin';
import Item from './Item';
import { HTML5Backend } from 'react-dnd';
import { DragDropManager } from 'dnd-core';

const manager = new DragDropManager(HTML5Backend);

export default class Container extends Component {
  render() {
    return (
      <div>
        <Dustbin manager={manager} />
        <div style={{ marginTop: '2rem' }}>
          <Item manager={manager} name='Glass' />
          <Item manager={manager} name='Banana' />
          <Item manager={manager} name='Paper' />
        </div>
      </div>
    );
  }
}
