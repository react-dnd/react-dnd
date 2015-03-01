'use strict';

import React from 'react';
import LinkedStateMixin from 'react/lib/LinkedStateMixin';
import Container from './Container';
import { Link } from 'react-router';

const DragAroundNaive = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      hideSourceOnDrag: false
    };
  },

  render() {
    const { hideSourceOnDrag } = this.state;

    return (
      <div>
        <Container hideSourceOnDrag={hideSourceOnDrag} />
        <p>
          <input type='checkbox'
                 checkedLink={this.linkState('hideSourceOnDrag')}>
            Hide source item while dragging
          </input>
        </p>
        <hr />
        <p>
          This example naively relies on browser drag and drop implementation without much custom logic.
        </p>
        <p>
          When element is dragged, we remove its original DOM node and let browser draw the drag preview.
          When element is released, we draw an element at the new coordinates.
          If you try to drag an item outside the container, browser will animate its return.
        </p>
        <p>
          While this approach works for simple cases, it flickers on drop.
          This happens because browser removes drag preview before we have a chance to make dragged item visible.
          This might not be a problem if you dim original item instead of hiding it, but it's clearly visible otherwise.
        </p>
        <p>
          If we want to add custom logic such as snapping to grid or bounds checking, we can only do this on drop.
          There is no way for us to control what happens to dragged preview once the browser has drawn it.
        </p>
        <p>Next: <Link to='drag-around-custom'>providing custom drag feedback</Link>.</p>
      </div>
    );
  }
});

export default DragAroundNaive;