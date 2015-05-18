import React from 'react';
import Container from './Container';

export default class DustbinSingleTarget {
  render() {
    return (
      <div>
        <p>
          This is the simplest example there is.
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
