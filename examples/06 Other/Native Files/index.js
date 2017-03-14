import React, { Component } from 'react';
import Container from './Container';

export default class NativeFiles extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href="https://github.com/react-dnd/react-dnd/tree/master/examples/05%20Customize/Native%20Files">Browse the Source</a></b>
        </p>
        <p>
          Example demonstrating drag and drop of native files.
        </p>
        <Container />
      </div>
    );
  }
}
