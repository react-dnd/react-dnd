'use strict';

import React, { PropTypes, Component } from 'react';
import Dustbin from './Dustbin';
import Box from './Box';
import { HTML5Backend } from 'react-dnd';
import { DragDropManager } from 'dnd-core';
import shuffle from 'lodash/collection/shuffle';

const manager = new DragDropManager(HTML5Backend);

const childContextTypes = {
  dnd: PropTypes.object.isRequired
};

export default class Container extends Component {
  getChildContext() {
    return {
      dnd: manager
    };
  }

  constructor(props) {
    super(props);
    this.state = { boxes: ['Glass', 'Banana', 'Paper'] };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.shuffleBoxes(), 1000);
  }

  shuffleBoxes() {
    this.setState({
      boxes: shuffle(this.state.boxes)
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    // We don't them keys for a reason:
    // we want to make sure drag source mirroring works correctly.

    // Try to drag an item and notice how componentWillReceiveProps
    // doesn't confuse components as to which item is being dragged.

    return (
      <div>
        <Dustbin />
        <div style={{ marginTop: '2rem' }}>
          {this.state.boxes.map(name => <Box name={name} />)}
        </div>
      </div>
    );
  }
}

Container.childContextTypes = childContextTypes;
