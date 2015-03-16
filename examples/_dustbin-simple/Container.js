'use strict';

import React, { PropTypes, createClass } from 'react';
import Dustbin from './Dustbin';
import Box from './Box';
import { DragDropContext, HTML5Backend } from 'react-dnd';
import shuffle from 'lodash/collection/shuffle';

const Container = createClass({
  mixins: [DragDropContext({
    dragDrop: HTML5Backend
  })],

  getInitialState() {
    return {
      boxes: ['Glass', 'Banana', 'Paper']
    };
  },

  componentDidMount() {
    this.interval = setInterval(() => this.shuffleBoxes(), 1000);
  },

  shuffleBoxes() {
    this.setState({
      boxes: shuffle(this.state.boxes)
    });
  },

  componentWillUnmount() {
    clearInterval(this.interval);
  },

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
});

export default Container;