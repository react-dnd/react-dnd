import React from 'react';
import Container from './Container';

export default class SortableCancelable {
  render() {
    return (
      <div>
        <p>
          Because you write the logic instead of using the readymade components, you can tweak the behavior to the one your app needs.
          In this example, instead of moving the card inside the drop target's <code>drop()</code> handler, we do it inside the drag source's <code>endDrag()</code> handler. This let us check <code>monitor.didDrop()</code> and revert the drag operation if the card was dropped outside its container.
        </p>
        <Container />
      </div>
    );
  }
}