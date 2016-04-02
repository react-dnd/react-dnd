*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

DropTarget
===================

Wrap your component with `DropTarget` to make it react to the compatible items being dragged, hovered, or dropped on it. `DropTarget` is a higher-order component.

To use `DropTarget`, don't forget to wrap the top-level component of your app in a [`DragDropContext`](docs-drag-drop-context.html).

### Signature

`DropTarget` uses partial application. After specifying its parameters with the first call, you need to pass your React component class as the only parameter in the second call. This signature makes `DropTarget` usable as an ES7 decorator. Read the [overview](docs-overview.html) for a more detailed explanation of the decorators and the higher-order components.

-------------------
```js
var DropTarget = require('react-dnd').DropTarget;

var MyComponent = React.createClass({
  /* ... */
});

module.exports = DropTarget(types, spec, collect)(MyComponent);
```
-------------------
```js
import { DropTarget } from 'react-dnd';

class MyComponent {
  /* ... */
}

export default DropTarget(types, spec, collect)(MyComponent);
```
-------------------
```js
import { DropTarget } from 'react-dnd';

@DropTarget(types, spec, collect)
export default class MyComponent {
  /* ... */
}
```
-------------------

### Parameters

* **`types`**: Required. A string, an ES6 symbol, an array of either, or a function that returns either of those, given component's `props`. This drop target will only react to the items produced by the [drag sources](docs-drag-source.html) of the specified type or types. Read the [overview](docs-overview.html) to learn more about the items and types.

* **`spec`**: Required. A plain JavaScript object with a few allowed methods on it. It describes how the drop target reacts to the drag and drop events. See the drop target specification described in detail in the next section.

* **`collect`**: Required. The collecting function. It should return a plain object of the props to inject into your component. It receives two parameters: `connect` and `monitor`. Read the [overview](docs-overview.html) for an introduction to the monitors, the connectors, and the collecting function. See the collecting function described in detail after the next section.

* **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)` function inside the `options` object can improve the performance. Unless you have performance problems, don't worry about it.

### Drop Target Specification

The second `spec` parameter must be a plain object implementing the drop target specification. Below is the list of all methods that it may have.

#### Specification Methods

* **`drop(props, monitor, component)`**: Optional. Called when a compatible item is dropped on the target. You may either return undefined, or a plain object. If you return an object, it is going to become *the drop result* and will be available to the drag source in its `endDrag` method as `monitor.getDropResult()`. This is useful in case you want to perform different actions depending on which target received the drop. If you have nested drop targets, you can test whether a nested target has already handled `drop` by checking `monitor.didDrop()` and `monitor.getDropResult()`. Both this method and the source's `endDrag` method are good places to fire Flux actions. This method will not be called if `canDrop()` is defined and returns `false`.

* **`hover(props, monitor, component)`**: Optional. Called when an item is hovered over the component. You can check `monitor.isOver({ shallow: true })` to test whether the hover happens over *just* the current target, or over a nested one. Unlike `drop()`, this method will be called even if `canDrop()` is defined and returns `false`. You can check `monitor.canDrop()` to test whether this is the case.

* **`canDrop(props, monitor)`**: Optional. Use it to specify whether the drop target is able to accept the item. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dropping based on some predicate over `props` or `monitor.getItem()`. *Note: You may not call `monitor.canDrop()` inside this method.*

**The spec offers no methods to handle enter or leave events by purpose.** Instead, return the result of `monitor.isOver()` call from your *collecting function*, so that you can use `componentWillReceiveProps` or `componentDidUpdate` React hooks to process the entering and the leaving events in your component. You may also check `monitor.isOver({ shallow: true })` if don't want the nested drop targets to count.

#### Specification Method Parameters

* **`props`**: Your component's current props.

* **`monitor`**: An instance of [`DropTargetMonitor`](docs-drop-target-monitor.html). Use it to query the information about the current drag state, such as the currently dragged item and its type, the current and initial coordinates and offsets, whether it is over the current target, and whether it can be dropped. Read the [`DropTargetMonitor` documentation](docs-drop-target-monitor.html) for a complete list of `monitor` methods, or read the [overview](docs-overview.html) for an introduction to the monitors.

* **`component`**: When specified, it is the instance of your component. Use it to access the underlying DOM node for position or size measurements, or to call `setState`, and other component methods. It is purposefully missing from `canDrop` because the instance may not be available by the time it is called. If you want this method to depend on the component's state, consider lifting the state to the parent component, so that you can just use `props`. Generally your code will be cleaner if you rely on `props` instead whenever possible.

### The Collecting Function

Just specifying the drop target `types` and `spec` is not quite enough.  
There's still a few more things we need to take care of:

* connect the React DnD event handlers to some node in the component;
* pass some knowledge about the dragging state to our component.

All communication between the React components happens via props, so it makes sense that React DnD injects special props into your component. However it gives you the freedom to name them and decide what props your component will receive.

Your *collecting function* will be called by React DnD with a *connector* that lets you connect nodes to the DnD backend, and a *monitor* to query information about the drag state. It should return a plain object of props to inject into your component.

If you're new to these concepts, the [overview](docs-overview.html) should give you a good idea about them.

#### Parameters

* **`connect`**: An instance of [`DropTargetConnector`](docs-drop-target-connector.html). It only has a single `dropTarget()` method. It returns a function you need to pass down to your component to connect the target DOM node to the React DnD backend. If you return something like `{ connectDropTarget: connect.dropTarget() }` from your `collect` function, the component will receive `connectDropTarget` as a prop so you can mark the relevant node inside its `render()` as droppable: `return this.props.connectDropTarget(<div>...</div>)`. You can see this pattern in action in the example at the end of this file. Read the [`DropTargetConnector` documentation](docs-drop-target-connector.html) for a complete list of `connect` methods, or read the [overview](docs-overview.html) for an introduction to the connectors.

* **`monitor`**: An instance of [`DropTargetMonitor`](docs-drop-target-monitor.html). It is precisely the same `monitor` you receive in the drop target specification methods, and you can use it to query the information about the current drag state. Read the [`DropTargetMonitor` documentation](docs-drop-target-monitor.html) for a complete list of `monitor` methods, or read the [overview](docs-overview.html) for an introduction to the monitors.

### Return Value

`DropTarget` wraps your component and returns another React component.  
For easier [testing](docs-testing.html), it provides an API to reach into the internals:

#### Static Properties

* **`DecoratedComponent`**: Returns the wrapped component type.

#### Instance Methods

* **`getDecoratedComponentInstance()`**: Returns the wrapped component instance.

* **`getHandlerId()`**: Returns the drag source ID that can be used to simulate the drag and drop events with the testing backend. Refer to the [testing](docs-testing.html) tutorial for a usage example.

### Nesting Behavior

If a drop target is nested in another drop target, both `hover()` and `drop()` bubble from the innermost target up the chain. There is no way to cancel the propagation by design. Instead, any drop target may compare `monitor.isOver()` and `monitor.isOver({ shallow: true })` to verify whether a child, or just the current drop target is being hovered. When dropping, any drop target in the chain may check whether it is the first in chain by testing if `monitor.didDrop()` returns `false`. Any parent drop target may override the drop result specified by the child drop target by explicitly returning another drop result from `drop()`. If a parent target returns `undefined` from its `drop()` handler, it does not change the existing drop result that may have been specified by a nested drop target. The drop targets that return `false` from `canDrop()` are exluded from the `drop()` dispatch.

### Handling Files and URLs

When using the [HTML5 backend](docs-html5-backend.html), you can handle the file drops just by registering a drop target for `HTML5Backend.NativeTypes.FILE` or `HTML5Backend.NativeTypes.URL` built-in types. Due to the browser security restrictions, `monitor.getItem()` does not provide any information about the files or the URLs until they are dropped.

### Example

Check out [the tutorial](docs-tutorial.html) for more real examples!

-------------------
```js
var React = require('react');
var findDOMNode = require('react-dom').findDOMNode;
var DropTarget = require('react-dnd').DropTarget;

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
var Types = {
  CHESSPIECE: 'chesspiece'
};

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
var chessSquareTarget = {
  canDrop: function (props, monitor) {
    // You can disallow drop based on props or item
    var item = monitor.getItem();
    return canMakeChessMove(item.fromPosition, props.position);
  },

  hover: function (props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    var clientOffset = monitor.getClientOffset();
    var componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    var isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    var canDrop = monitor.canDrop();
  },

  drop: function (props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    var item = monitor.getItem();

    // You can do something with it
    ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

var ChessSquare = React.createClass({
  componentWillReceiveProps: function (nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  },

  render: function () {
    // Your component receives its own props as usual
    var position = this.props.position;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;
    var connectDropTarget = this.props.connectDropTarget;

    return connectDropTarget(
      <div className='Cell'>
        {isOver && canDrop && <div class='green' />}
        {!isOver && canDrop && <div class='yellow' />}
        {isOver && !canDrop && <div class='red' />}
      </div>
    );
  }
});

module.exports = DropTarget(Types.CHESSPIECE, chessSquareTarget, collect)(ChessSquare);
```
-------------------
```js
import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CHESSPIECE: 'chesspiece'
};

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const chessSquareTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    return canMakeChessMove(item.fromPosition, props.position);
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    // You can do something with it
    ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class ChessSquare {
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }

  render() {
    // Your component receives its own props as usual
    const { position } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className='Cell'>
        {isOver && canDrop && <div class='green' />}
        {!isOver && canDrop && <div class='yellow' />}
        {isOver && !canDrop && <div class='red' />}
      </div>
    );
  }
}

export default DropTarget(Types.CHESSPIECE, chessSquareTarget, collect)(ChessSquare);
```
-------------------
```js
import React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget } from 'react-dnd';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CHESSPIECE: 'chesspiece'
};

/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
const chessSquareTarget = {
  canDrop(props, monitor) {
    // You can disallow drop based on props or item
    const item = monitor.getItem();
    return canMakeChessMove(item.fromPosition, props.position);
  },

  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();

    // You can do something with it
    ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

@DropTarget(Types.CHESSPIECE, chessSquareTarget, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDropTarget: connect.dropTarget(),
  // You can ask the monitor about the current drag state:
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))
export default class ChessSquare {
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOver && nextProps.isOver) {
      // You can use this as enter handler
    }

    if (this.props.isOver && !nextProps.isOver) {
      // You can use this as leave handler
    }

    if (this.props.isOverCurrent && !nextProps.isOverCurrent) {
      // You can be more specific and track enter/leave
      // shallowly, not including nested targets
    }
  }

  render() {
    // Your component receives its own props as usual
    const { position } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className='Cell'>
        {isOver && canDrop && <div class='green' />}
        {!isOver && canDrop && <div class='yellow' />}
        {isOver && !canDrop && <div class='red' />}
      </div>
    );
  }
}
```
-------------------

## Type Definitions

```js
type ReactProps = Object;

type DropTargetTypes =
  string |
  symbol |
  Array<string | symbol> |
  (props: ReactProps) => string | symbol | Array<string | symbol>;

type DropTargetSpec = {
  drop: ?(
    props: ReactProps,
    monitor: DropTargetMonitor,
    component: YourReactClass
  ) => ?Object;

  hover: ?(
    props: ReactProps,
    monitor: DropTarget,
    component: ?YourReactClass
  ) => void;

  canDrop: ?(
    props: ReactProps,
    monitor: DropTarget
  ) => boolean;
};

type DropTargetOptions = {
  arePropsEqual: ?(Object, Object) => boolean
};

DropTarget: (
  type: DropTargetTypes,
  spec: DropTargetSpec,
  collect: (
    connect: DropTargetConnector,
    monitor: DropTargetMonitor
  ) => Object,
  options: ?DropTargetOptions
) => (
  component: YourReactClass
) => ReactClass
```
