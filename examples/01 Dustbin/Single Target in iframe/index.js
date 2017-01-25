import React, { Component } from 'react';
import Container from './Container';

export default class DustbinSingleTargetIframe extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href="https://github.com/react-dnd/react-dnd/tree/master/examples/01%20Dustbin/Single%20Target%20in%20iframe">Browse the Source</a></b>
        </p>
        <p>
          This is the simplest example there is, but in an iframe.
        </p>
        <p>
          Drag the boxes below and drop them into the dustbin.
          Note that it has a neutral, an active and a hovered state.
          The dragged item itself changes opacity while dragged.
        </p>
        <Container />
      </div>
    );
  }
}
