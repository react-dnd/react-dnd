'use strict';

import React, { PropTypes, Component } from 'react';
import { configureDragDropContext, DragDropContext, HTML5Backend } from 'react-dnd';
import Dustbin from './Dustbin';
import Box from './Box';
import shuffle from 'lodash/collection/shuffle';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: ['Glass', 'Banana', 'Paper']
    };
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
    return (
      <div>
        <Dustbin />
        <div style={{ marginTop: '2rem' }}>
          {this.state.boxes.map(name => <Box name={name} key={name} />)}
        </div>
      </div>
    );
  }
}

export default configureDragDropContext(Container, HTML5Backend);