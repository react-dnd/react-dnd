'use strict';

import React from 'react';
import Source from './Source';
import Colors from './Colors';
import Target from './Target';
import { configureDragDropContext, HTML5Backend } from 'react-dnd';

class Container {
  render() {
    return (
      <div style={{ height: 320 }}>
        <div style={{ float: 'left' }}>
          <Source color={Colors.BLUE}>
            <Source color={Colors.YELLOW}>
              <Source color={Colors.YELLOW} />
              <Source color={Colors.BLUE} />
            </Source>
            <Source color={Colors.BLUE}>
              <Source color={Colors.YELLOW} />
            </Source>
          </Source>
        </div>

        <div style={{ float: 'left', marginLeft: 100, marginTop: 50 }}>
          <Target />
        </div>
      </div>
    );
  }
}

export default configureDragDropContext(Container, {
  backend: HTML5Backend
});