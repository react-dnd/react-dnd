'use strict';

import React from 'react';
import Dustbin from './Dustbin';
import Box from './Box';
import { configureDragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@configureDragDropContext(HTML5Backend)
export default class Container {
  render() {
    return (
      <div>
        <div style={{minHeight: '14rem', overflow: 'auto'}}>
          <Dustbin greedy>
            <Dustbin greedy>
              <Dustbin greedy />
            </Dustbin>
          </Dustbin>

          <Dustbin>
            <Dustbin>
              <Dustbin />
            </Dustbin>
          </Dustbin>
        </div>

        <div style={{ minHeight: '2rem' }}>
          <Box />
        </div>
      </div>
    );
  }
}