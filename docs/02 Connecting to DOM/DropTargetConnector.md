*New to React DnD? [Read the overview](/docs-overview.html) before jumping into the docs.*

DropTargetConnector
===================

`DropTargetConnector` is an object passed to a collecting function of [`DropTarget`](/docs-drop-target.html). Its only method `dropTarget()` returns a function that lets you assign the drop target role to one of your component's DOM nodes.

### Signature

Call the `DropTargetConnector`'s `dropTarget()` method inside your *collecting function*. When the returned function is passed to your component as a prop, you can indicate that a DOM node should act as a drop target by using that function inside your `render` function. Internally it works by attaching a [callback ref](https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute) to the React element you give it. This callback connects the DOM node of your component to the chosen DnD backend.

### Methods

The function returned by the `dropTarget()` connector method needs to be applied inside the component's `render` method. It will return the clone of your React element with the backend event handlers attached.

* **`dropTarget() => (elementOrNode)`**: Returns a function that must be used inside the component to assign the drop target role to a node. By returning `{ connectDropTarget: connect.dropTarget() }` from your collecting function, you can mark any React element as the droppable node. To do that, replace any `element` with `this.props.connectDropTarget(element)` inside the `render` function.

### Example

-------------------
```js
var React = require('react');
var DropTarget = require('react-dnd').DropTarget;

/* ... */

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dragSource()
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
    connectDropTarget: connect.dragSource()
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
    connectDropTarget: connect.dragSource()
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

