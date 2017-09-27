import React, { Component } from 'react';
import Container from './Container';

export default class DragAroundCheckOverTargetOrNot extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/02%20Drag%20Around/Check%20Over%20Target%20or%20Not'>Browse the Source</a></b>
        </p>
        <p>
          The custom drag preview will check whether it's over the target or not.
          If it's true, it will say "I'm over the target :)", otherwise it will say "I'm out of the target :(".
        </p>
        <Container />
      </div>
    );
  }
}
