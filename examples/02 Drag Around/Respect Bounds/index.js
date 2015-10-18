import React, { Component } from 'react';
import Container from './Container';

export default class DragAroundRespectBounds extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/02%20Drag%20Around/Respect Bounds'>Browse the Source</a></b>
        </p>
        <p>
          When the box is dragged, we keep its original DOM node. As a drag preview, we render layer which literaly shows nothing - we have box element for this.
          In <code>hover()</code> parent watches <i>top</i> and <i>left</i> offset of dragged box as it is dragged over parent.
          <br/>
          Only values which could be located in parent's area are considered to be valid. If current offset is such value, position of box is updated.
        </p>
        <p>
          If you experience low refresh rate, consider positioning box using <code>CSS transform</code> property, instead of setting it's <code>top</code> or <code>left</code> position.
          <br/>
          It's GPU accelerated
        </p>

        <Container />
      </div>
    );
  }
}
