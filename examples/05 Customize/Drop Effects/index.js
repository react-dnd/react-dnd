import React from 'react';
import Container from './Container';

export default class CustomizeHandles {
  render() {
    return (
      <div>
        <p>
          Some browsers let you specify the “drop effects” for the draggable items.
          In the compatible browsers, you will see a “copy” icon when you drag the first box over the drop zone.
        </p>
        <Container />
      </div>
    );
  }
}
