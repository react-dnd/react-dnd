import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import SourceBox from './SourceBox';
import TargetBox from './TargetBox';
import BoxDragLayer from './BoxDragLayer';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1rem',
  marginBottom: '1rem',
  cursor: 'move'
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  render() {
    return (
      <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
        <div style={{ float: 'left', marginRight: '1rem' }}>
          <SourceBox />
        </div>
        <BoxDragLayer />
        <div style={{ float: 'left' }}>
          <TargetBox />
        </div>
      </div>
    );
  }
}