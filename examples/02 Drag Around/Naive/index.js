import React, { Component } from 'react';
import Container from './Container';

export default class DragAroundNaive extends Component {
  constructor(props) {
    super(props);
    this.handleHideSourceClick = this.handleHideSourceClick.bind(this);
    this.state = {
      hideSourceOnDrag: true
    };
  }

  handleHideSourceClick() {
    this.setState({
      hideSourceOnDrag: !this.state.hideSourceOnDrag
    });
  }

  render() {
    const { hideSourceOnDrag } = this.state;

    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/02%20Drag%20Around/Naive'>Browse the Source</a></b>
        </p>
        <p>
          This example naively relies on browser drag and drop implementation without much custom logic.
        </p>
        <p>
          When the box is dragged, we remove its original DOM node by returning <code>null</code> from <code>render()</code> and let browser draw the drag preview.
          When the is released, we draw it at the new coordinates.
          If you try to drag the box outside the container, the browser will animate its return.
        </p>
        <p>
          While this approach works for simple cases, it flickers on drop.
          This happens because the browser removes the drag preview before we have a chance to make the dragged item visible.
          This might not be a problem if you dim the original item instead of hiding it, but it's clearly visible otherwise.
        </p>
        <p>
          If we want to add custom logic such as snapping to grid or bounds checking, we can only do this on drop.
          There is no way for us to control what happens to dragged preview once the browser has drawn it.
          Check out the <a href='examples-drag-around-custom-drag-layer.html'>custom rendering example</a> if you'd rather trade more control for some more work.
        </p>
        <Container hideSourceOnDrag={hideSourceOnDrag} />
        <p>
          <label>
            <input type='checkbox'
                   checked={hideSourceOnDrag}
                   onChange={this.handleHideSourceClick} />
            <small>Hide the source item while dragging</small>
          </label>
        </p>
      </div>
    );
  }
}