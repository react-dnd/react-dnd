import React, { Component } from 'react';
import Container from './Container';

export default class SortableStressTest extends Component {
  constructor(props) {
    super(props);
    // Avoid rendering on server because the big data list is generated
    this.state = { shouldRender: false };
  }

  componentDidMount() {
    // Won't fire on server.
    this.setState({ shouldRender: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    const { shouldRender } = this.state;

    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/04%20Sortable/Stress%20Test'>Browse the Source</a></b>
        </p>
        <p>
          How many items can React DnD handle at the same time?
          There are a thousand items in this list.
          With some optimizations like updating the state inside a <code>requestAnimationFrame</code> callback, it can handle a few thousand items without lagging.
          After that, you're better off using virtual lists like <a href='https://github.com/facebook/fixed-data-table'>fixed-data-table</a>.
          Luckily, React DnD is designed to work great with any virtual React data list components because it doesn't keep any state in the DOM.
        </p>
        <p>
          This example does not scroll automatically but you can add the scrolling with a parent drop target that compares <code>component.getBoundingClientRect()</code> with <code>monitor.getClientOffset()</code> inside its <code>hover</code> handler.
          In fact, you are welcome to contribute this functionality to this example!
        </p>
        {shouldRender && <Container />}
      </div>
    );
  }
}
