import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Sortable from './Sortable';

class CustomElement extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  // Do not modify this component. This is just an example to reproduce the problem.
  // In practice the CustomElement component is something we cannot control.
  render() {
    return <div>{this.props.children}</div>;
  }
}

@DragDropContext(HTML5Backend)
export default class SortableGeneric extends Component {
  render() {
    return (
      <div>
        <p>
          <b><a href='https://github.com/gaearon/react-dnd/tree/master/examples/04%20Sortable/Generic'>Browse the Source</a></b>
        </p>
        <p>
          This is a test use case submission for issue reported at <a href="https://github.com/gaearon/react-dnd/issues/305#issuecomment-152247354">https://github.com/gaearon/react-dnd/issues/305#issuecomment-152247354</a>.
        </p>
        <p>
          The component below works because the elements are divs.
        </p>
        <Sortable>
            <div>
                <div eventKey="1">Item 1</div>
                <div eventKey="2">Item 2</div>
                <div eventKey="3">Item 3</div>
                <div eventKey="4">Item 4</div>
            </div>
        </Sortable>
        <p>
          However, this no longer works. And it is not clear how we should fix the SortableItem component to deal with it.
        </p>
        <Sortable>
            <div>
                <CustomElement eventKey="1">Item 1</CustomElement>
                <CustomElement eventKey="2">Item 2</CustomElement>
                <CustomElement eventKey="3">Item 3</CustomElement>
                <CustomElement eventKey="4">Item 4</CustomElement>
            </div>
        </Sortable>
      </div>
    );
  }
}