*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

DragSource
===================

Wrap your component with `DragSource` to make it draggable. `DragSource` is a higher-order component accepting three required parameters. They are described in detail below.

To use `DragSource`, don't forget to wrap the top-level component of your app in a [`DragDropContext`](docs-drag-drop-context.html).

### Signature

`DragSource` uses partial application. After specifying its parameters with the first call, you need to pass your React component class as the only parameter in the second call. This signature makes `DragSource` usable as an ES7 decorator. Read the [overview](docs-overview.html) for a more detailed explanation of the decorators and the higher-order components.

-------------------
```js
var DragSource = require('react-dnd').DragSource;

var MyComponent = React.createClass({
  /* ... */
});

module.exports = DragSource(type, spec, collect)(MyComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';

class MyComponent {
  /* ... */
}

export default DragSource(type, spec, collect)(MyComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';

@DragSource(type, spec, collect)
export default class MyComponent {
  /* ... */
}
```
-------------------


### Parameters

* **`type`**: Required. Either a string, an ES6 symbol, or a function that returns either given the component's `props`. Only the [drop targets](docs-drop-target.html) registered for the same type will react to the items produced by this drag source. Read the [overview](docs-overview.html) to learn more about the items and types.

* **`spec`**: Required. A plain JavaScript object with a few allowed methods on it. It describes how the drag source reacts to the drag and drop events. See the drag source specification described in detail in the next section.

* **`collect`**: Required. The collecting function. It should return a plain object of the props to inject into your component. It receives two parameters: `connect` and `monitor`. Read the [overview](docs-overview.html) for an introduction to the monitors, the connectors, and the collecting function. See the collecting function described in detail after the next section.

* **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)` function inside the `options` object can improve the performance. Unless you have performance problems, don't worry about it.

### Drag Source Specification

The second `spec` parameter must be a plain object implementing the drag source specification. Below is the list of all methods that it may have.

#### Specification Methods

* **`beginDrag(props, monitor, component)`**: Required. When the dragging starts, `beginDrag` is called. You must return a plain JavaScript object describing the data being dragged. What you return is the *only* information available to the drop targets about the drag source so it's important to pick the *minimal* data they need to know. You may be tempted to put a reference to the `component` into it, but you should try very hard to avoid doing this because it couples the drag sources and drop targets. It's a good idea to return something like `{ id: props.id }` from this method.

* **`endDrag(props, monitor, component)`**: Optional. When the dragging stops, `endDrag` is called. For every `beginDrag` call, a corresponding `endDrag` call is guaranteed. You may call `monitor.didDrop()` to check whether or not the drop was handled by a compatible drop target. If it was handled, and the drop target specified a *drop result* by returning a plain object from its `drop()` method, it will be available as `monitor.getDropResult()`. This method is a good place to fire a Flux action. *Note: If the component is unmounted while dragging, `component` parameter is set to be `null`.*

* **`canDrag(props, monitor)`**: Optional. Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dragging based on some predicate over `props`. *Note: You may not call `monitor.canDrag()` inside this method.*

* **`isDragging(props, monitor)`**: Optional. By default, only the drag source that initiated the drag operation is considered to be dragging. You can override this behavior by defining a custom `isDragging` method. It might return something like `props.id === monitor.getItem().id`. Do this if the original component may be unmounted during the dragging and later “resurrected” with a different parent. For example, when moving a card across the lists in a Kanban board, you want it to retain the dragged appearance—even though technically, the component gets unmounted and a different one gets mounted every time you move it to another list. *Note: You may not call `monitor.isDragging()` inside this method.*

#### Specification Method Parameters

* **`props`**: Your component's current props.

* **`monitor`**: An instance of [`DragSourceMonitor`](docs-drag-source-monitor.html). Use it to query the information about the current drag state, such as the currently dragged item and its type, the current and initial coordinates and offsets, and whether it was dropped yet. Read the [`DragSourceMonitor` documentation](docs-drag-source-monitor.html) for a complete list of `monitor` methods, or read the [overview](docs-overview.html) for an introduction to the monitors.

* **`component`**: When specified, it is the instance of your component. Use it to access the underlying DOM node for position or size measurements, or to call `setState`, and other component methods. It is purposefully missing from `isDragging` and `canDrag` because the instance may not be available by the time they are called. If you want these methods to depend on the component's state, consider lifting the state to the parent component, so that you can just use `props`. Generally your code will be cleaner if you rely on `props` instead whenever possible.

### The Collecting Function

Just specifying the drag source `type` and `spec` is not quite enough.  
There's still a few more things we need to take care of:

* connect the React DnD event handlers to some node in the component;
* pass some knowledge about the dragging state to our component.

All communication between the React components happens via props, so it makes sense that React DnD injects special props into your component. However it gives you the freedom to name them and decide what props your component will receive.

Your *collecting function* will be called by React DnD with a *connector* that lets you connect nodes to the DnD backend, and a *monitor* to query information about the drag state. It should return a plain object of props to inject into your component.

If you're new to these concepts, the [overview](docs-overview.html) should give you a good idea about them.

#### Parameters

* **`connect`**: An instance of [`DragSourceConnector`](docs-drag-source-connector.html). It has two methods: `dragPreview()` and `dragSource()`. Of them, `dragSource()` is the one you'll use the most. It returns a function you need to pass down to your component to connect the source DOM node to the React DnD backend. If you return something like `{ connectDragSource: connect.dragSource() }` from your `collect` function, the component will receive `connectDragSource` as a prop so you can mark the relevant node inside its `render()` as draggable: `return this.props.connectDragSource(<div>...</div>)`. You can see this pattern in action in the example at the end of this file. Read the [`DragSourceConnector` documentation](docs-drag-source-connector.html) for a complete list of `connect` methods, or read the [overview](docs-overview.html) for an introduction to the connectors.

* **`monitor`**: An instance of [`DragSourceMonitor`](docs-drag-source-monitor.html). It is precisely the same `monitor` you receive in the drag source specification methods, and you can use it to query the information about the current drag state. Read the [`DragSourceMonitor` documentation](docs-drag-source-monitor.html) for a complete list of `monitor` methods, or read the [overview](docs-overview.html) for an introduction to the monitors.

### Return Value

`DragSource` wraps your component and returns another React component.  
For easier [testing](docs-testing.html), it provides an API to reach into the internals:

#### Static Properties

* **`DecoratedComponent`**: Returns the wrapped component type.

#### Instance Methods

* **`getDecoratedComponentInstance()`**: Returns the wrapped component instance.

* **`getHandlerId()`**: Returns the drag source ID that can be used to simulate the drag and drop events with the testing backend. Refer to the [testing](docs-testing.html) tutorial for a usage example.

### Nesting Behavior

If a drag source is nested in another drag source, the innermost drag source of the compatible type wins. Drag sources that return `false` from `canDrag` are skipped. The chosen drag source is the only one that will receive `beginDrag` and, subsequently, `endDrag`. There is no propagation once the drag source is determined.

### Example

Check out [the tutorial](docs-tutorial.html) for more real examples!

-------------------
```js
var React = require('react');
var DragSource = require('react-dnd').DragSource;

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
var Types = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
var cardSource = {
  canDrag: function (props) {
    // You can disallow drag based on props
    return props.isReady;
  },

  beginDrag: function (props) {
    // Return the data describing the dragged item
    var item = { id: props.id };
    return item;
  },

  isDragging: function (props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    var item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    var dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action
    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

var Card = React.createClass({
  render: function () {
    // Your component receives its own props as usual
    var id = this.props.id;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
});

module.exports = DragSource(Types.CARD, cardSource, collect)(Card);
```
-------------------
```js
import React from 'react';
import { DragSource } from 'react-dnd';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.isReady;
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action
    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Card {
  render() {
    // Your component receives its own props as usual
    const { id } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
}

export default DragSource(Types.CARD, cardSource, collect)(Card);
```
-------------------
```js
import React from 'react';
import { DragSource } from 'react-dnd';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  canDrag(props) {
    // You can disallow drag based on props
    return props.isReady;
  },

  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // (like a card in Kanban board dragged between lists)
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.id;
  },

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    const item = { id: props.id };
    return item;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      // You can check whether the drop was successful
      // or if the drag ended but nobody handled the drop
      return;
    }

    // When dropped on a compatible target, do something.
    // Read the original dragged item from getItem():
    const item = monitor.getItem();

    // You may also read the drop result from the drop target
    // that handled the drop, if it returned an object from
    // its drop() method.
    const dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action
    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

@DragSource(Types.CARD, cardSource, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging()
}))
export default class Card {
  render() {
    // Your component receives its own props as usual
    const { id } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
}
```
-------------------

## Type Definitions

```js
type ReactProps = Object;

type DragSourceType =
  string |
  symbol |
  (props: ReactProps) => string | symbol;

type DragSourceSpec = {
  beginDrag: (
    props: ReactProps,
    monitor: DragSourceMonitor,
    component: YourReactClass
  ) => Object;

  endDrag: ?(
    props: ReactProps,
    monitor: DragSourceMonitor,
    component: ?YourReactClass
  ) => void;

  canDrag: ?(
    props: ReactProps,
    monitor: DragSourceMonitor
  ) => boolean;

  isDragging: ?(
    props: Object,
    monitor: DragSourceMonitor
  ) => boolean;
};

type DragSourceOptions = {
  arePropsEqual: ?(Object, Object) => boolean
};

DragSource: (
  type: DragSourceType,
  spec: DragSourceSpec,
  collect: (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor
  ) => Object,
  options: ?DragSourceOptions
) => (
  component: YourReactClass
) => ReactClass
```
