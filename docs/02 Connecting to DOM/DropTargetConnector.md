*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

DropTargetConnector
===================

`DropTargetConnector` is an object passed to a collecting function of the [`DropTarget`](docs-drop-target.html). Its only method `dropTarget()` returns a function that lets you assign the drop target role to one of your component's DOM nodes.

### Methods

Call the `DropTargetConnector`'s `dropTarget()` method inside your *collecting function*. This will pass the returned function to your component as a prop. You can then use it inside `render` or `componentDidMount` to indicate a DOM node should react to drop target events. Internally it works by attaching a [callback ref](https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute) to the React element you give it. This callback connects the DOM node of your component to the chosen DnD backend.

* **`dropTarget() => (elementOrNode)`**: Returns a function that must be used inside the component to assign the drop target role to a node. By returning `{ connectDropTarget: connect.dropTarget() }` from your collecting function, you can mark any React element as the droppable node. To do that, replace any `element` with `this.props.connectDropTarget(element)` inside the `render` function.

### Example

Check out [the tutorial](docs-tutorial.html) for more real examples!

-------------------
```js
var React = require('react');
var DropTarget = require('react-dnd').DropTarget;

/* ... */

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

var DropZone = React.createClass({
  render: function () {
    var connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div>
        You can drop here!
      </div>
    );
  }
});

module.exports = DropTarget(/* ... */)(DropZone);
```
-------------------
```js
import React from 'react';
import { DropTarget } from 'react-dnd';

/* ... */

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class DropZone {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div>
        You can drop here!
      </div>
    );
  }
}

export default DropTarget(/* ... */)(DropZone);
```
-------------------
```js
import React from 'react';
import { DropTarget } from 'react-dnd';

/* ... */

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

@DropTarget(/* ... */)
export default class DropZone {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div>
        You can drop here!
      </div>
    );
  }
}
```
-------------------

