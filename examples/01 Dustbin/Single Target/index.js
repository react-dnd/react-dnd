import React from 'react';
import Container from './Container';

export default class DustbinSingleTarget {
  render() {
    return (
      <div>
        <p>
          Drag items on the dropzone. Note that it has a neutral, an active and a hovered state.
          <br />
          The dragged item itself changes opacity while dragged.
        </p>
        <Container />
      </div>
    );
  }
}
