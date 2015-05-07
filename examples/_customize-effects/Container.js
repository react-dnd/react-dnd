'use strict';

import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  render() {
    return (
      <div style={{ height: 200 }}>
        <div style={{ float: 'left', marginTop: 20 }}>
          <SourceBox showCopyIcon />
          <SourceBox />
        </div>
        <div style={{ float: 'left', marginLeft: 100 }}>
          <TargetBox />
        </div>
      </div>
    );
  }
}