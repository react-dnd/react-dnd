'use strict';

import React from 'react';
import Container from './Container';

const DustbinSimple = React.createClass({
  render() {
    return (
      <div>
        <Container />
        <hr />
        <p>
          Drag items on a dropzone. Note that it has different neutral, active (something is being dragged) and hovered states.
          Dragged item itself has neutral and dragging states.
        </p>
      </div>
    );
  }
});

export default DustbinSimple;