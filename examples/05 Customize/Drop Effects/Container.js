import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  render() {
    return (
      <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
        <div style={{ float: 'left' }}>
          <SourceBox showCopyIcon />
          <SourceBox />
        </div>
        <div style={{ float: 'left' }}>
          <TargetBox />
        </div>
      </div>
    );
  }
}