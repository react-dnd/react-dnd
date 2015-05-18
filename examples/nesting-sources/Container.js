'use strict';

import React from 'react';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';
import Colors from './Colors';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@DragDropContext(HTML5Backend)
export default class Container {
  render() {
    return (
      <div style={{ height: 320 }}>
        <div style={{ float: 'left' }}>
          <SourceBox color={Colors.BLUE}>
            <SourceBox color={Colors.YELLOW}>
              <SourceBox color={Colors.YELLOW} />
              <SourceBox color={Colors.BLUE} />
            </SourceBox>
            <SourceBox color={Colors.BLUE}>
              <SourceBox color={Colors.YELLOW} />
            </SourceBox>
          </SourceBox>
        </div>

        <div style={{ float: 'left', marginLeft: 100, marginTop: 50 }}>
          <TargetBox />
        </div>
      </div>
    );
  }
}