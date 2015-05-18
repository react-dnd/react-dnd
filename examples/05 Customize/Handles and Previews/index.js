import React from 'react';
import Container from './Container';

export default class CustomizeHandles {
  render() {
    return (
      <div>
        <p>
          React DnD lets you choose the draggable node, as well as the drag preview node in your component's <code>render</code> function.
          You may also use an <a href='https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image'><code>Image</code></a> instance that you created programmatically once it has loaded.
        </p>
        <Container />
      </div>
    );
  }
}
