import React from 'react';
import Container from './Container';

export default class NestingSources {
  render() {
    return (
      <div>
        <p>
          You can nest the drag sources in one another.
          If a nested drag source returns <code>false</code> from <code>canDrag</code>, its parent will be asked, until a draggable source is found and activated.
          Only the activated drag source will have its <code>beginDrag()</code> and <code>endDrag()</code> called.
        </p>
        <Container />
      </div>
    );
  }
}