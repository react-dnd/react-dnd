import React, { Component } from 'react';
import Container from './Container';

export default class DustbinSingleTargetIframe extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href="https://github.com/react-dnd/react-dnd/tree/master/examples/01%20Dustbin/Single%20Target%20in%20iframe">Browse the Source</a></b>
        </p>
        <p>
          This is the same simple example, but nested in an iframe.
        </p>
        <p>
          When you are using the react-dnd-html5-backend, you are limited to drag-and-drop within a single iframe.
        </p>
        <p>
          Using react-dnd inside of an iframe requires a slightly different
          container configuration. Check out the source for more details.
        </p>
        <Container />
      </div>
    );
  }
}
