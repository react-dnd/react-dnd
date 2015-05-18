import React from 'react';
import Container from './Container';

export default class DustbinStressTest {
  render() {
    return (
      <div>
        <p>
          This example is similar to the previous one, but props of both the drag sources and the drop targets change every second.
          It demonstrates that React DnD keeps track of the changing props, and if a component receives the new props, React DnD recalculates the drag and drop state.
          It also shows how a custom <code>isDragging</code> implementation can make the drag source appear as dragged, even if the component that initiated the drag has received new props.
        </p>
        <Container />
      </div>
    );
  }
}