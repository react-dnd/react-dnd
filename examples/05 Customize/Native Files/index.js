import React, { Component } from 'react';
import Container from './Container';

export default class NativeFileDnD extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href="https://github.com/react-dnd/react-dnd/tree/master/examples/05%20Customize/Native%20Files">Browse the Source</a></b>
        </p>
        <p>
          Example showcasing file drag and drop
        </p>
        <Container />
      </div>
    );
  }
}
