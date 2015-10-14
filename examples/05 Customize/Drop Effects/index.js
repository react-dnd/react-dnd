import React, { Component } from 'react';
import Container from './Container';

export default class CustomizeDropEffects extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/05%20Customize/Drop%20Effects'>Browse the Source</a></b>
        </p>
        <p>
          Some browsers let you specify the “drop effects” for the draggable items.
          In the compatible browsers, you will see a “copy” icon when you drag the first box over the drop zone.
        </p>
        <Container />
      </div>
    );
  }
}
