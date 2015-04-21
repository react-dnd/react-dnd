'use strict';

import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './DragLayer';
import { configureDragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import TouchBackend from 'react-dnd/modules/backends/Touch';
import supportsTouch from '../supportsTouch';

@configureDragDropContext(supportsTouch() ? TouchBackend : HTML5Backend)
export default class DragAroundCustom extends Component {
  constructor(props) {
    super(props);

    this.handleSnapToGridAfterDropChange = this.handleSnapToGridAfterDropChange.bind(this);
    this.handleSnapToGridWhileDraggingChange = this.handleSnapToGridWhileDraggingChange.bind(this);

    this.state = {
      snapToGridAfterDrop: false,
      snapToGridWhileDragging: false
    };
  }

  render() {
    const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state;

    return (
      <div>
        <Container snapToGrid={snapToGridAfterDrop} />
        <DragLayer snapToGrid={snapToGridWhileDragging} />
        <p>
          <input type='checkbox'
                 checked={snapToGridAfterDrop}
                 onChange={this.handleSnapToGridAfterDropChange}>
            Snap to grid after drop
          </input>
          <br />
          <input type='checkbox'
                 checked={snapToGridWhileDragging}
                 onChange={this.handleSnapToGridWhileDraggingChange}>
            Snap to grid while dragging
          </input>
        </p>
      </div>
    );
  }

  handleSnapToGridAfterDropChange() {
    this.setState({
      snapToGridAfterDrop: !this.state.snapToGridAfterDrop
    });
  }

  handleSnapToGridWhileDraggingChange() {
    this.setState({
      snapToGridWhileDragging: !this.state.snapToGridWhileDragging
    });
  }
}