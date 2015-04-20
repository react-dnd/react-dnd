'use strict';

import React, { Component } from 'react';
import Container from './Container';
import DragLayer from './DragLayer';
import { configureDragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';

@configureDragDropContext(HTML5Backend)
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
        <hr />
        <p>
          Browser APIs provide no way to change drag preview or its behavior once drag has started.
          Libraries such as jQuery UI implement drag and drop from scratch to work around this, but react-dnd
          only supports browser drag and drop “backend” for now, so we have to accept its limitations.
        </p>
        <p>
          We can, however, customize behavior a great deal if we feed the browser an empty image as drag preview.
          This library provides <code>DragLayerMixin</code> that you can use to implement a fixed layer on top of your app where you'd draw a custom drag preview component.
        </p>
        <p>
          Note that we can draw a completely different component on our drag layer if we wish so. It's not just a screenshot.
        </p>
        <p>
          With this approach, we miss out on default “return” animation when dropping outside the container.
          However, we get great flexibility in customizing drag feedback and zero flicker.
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