DropTarget
===================

Wrap your component with `DropTarget` to make it react to the compatible items being dragged, hovered, or dropped on it. `DropTarget` is a higher-order component.

>**Note: This documentation page uses the concepts established in the overview.**  
>**Please make sure to [read the overview](/docs-overview.html) first.**

### Signature

`DropTarget` uses partial application. After specifying its parameters with the first call, you need to pass your React component class as the only parameter in the second call. This signature makes `DropTarget` usable as an ES7 decorator. Read the [overview](/docs-overview.html) for a more detailed explanation of the decorators and the higher-order components.

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

* **`types`**: Required. A string, an ES6 symbol, an array of either, or a function that returns either of those, given component's `props`. This drop target will only react to the items created by the [drag sources](/docs-drag-source.html) of the specified type(s). Read the [overview](/docs-overview.html) to learn more about the types.

* **`spec`**: Required. A plain JavaScript object with a few allowed methods on it. It describes how the drop target reacts to the drag and drop events. See the drop target specification described in detail in the next section.

* **`collect`**: Required. The collecting function. It should return a plain object of the props to inject into your component. It receives two parameters: `monitor` and `connect`. Read the [overview](/docs-overview.html) for an introduction to the monitors, the connectors, and the collecting function.

* **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)` function as an `options` key can improve the performance. Unless you have performance problems, don't worry about it.

### Drop Target Specification

The second `spec` parameter must be a plain object implementing the drop target specification. Below is the list of all methods that it may have.

#### Specification Methods

* **`drop(props, monitor, component)`**: Optional. Called when a compatible item is dropped on the target. You may either return undefined, or a plain object. If you return an object, it is going to become *the drop result* and will be available to the drag source in its `endDrag` method as `monitor.getDropResult()`. This is useful in case you want to perform different actions depending on which target received the drop. If you work with nested drop targets, you can check whether a nested target has already handled `drop` by calling `monitor.didDrop()` and `monitor.getDropResult()`. Both this method and the source's `endDrag` method are good places to fire Flux actions. This method will not be called if `canDrop()` is defined and returns `false`.

* **`hover(props, monitor, component)`**: Optional. Called when an item is hovered over the component. You can check `monitor.isOver({ shallow: true })` to test whether the hover happens over *just* the current target, or over a nested one. Unlike `drop()`, this method will be called even if `canDrop()` is defined and returns `false`. You can check `monitor.canDrop()` to test whether this was the case.

* **`canDrop(props, monitor)`**: Optional. Use it to specify whether the drop target is able to accept the item. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dropping based on some predicate over `props` or `monitor.getItem()`. *Note: You may not call `monitor.canDrop()` inside this method.*

**The spec offers no methods to handle enter or leave events by purpose.** Instead, return the result of `monitor.isOver()` call from your *collecting function*, so that you can use `componentWillReceiveProps` or `componentDidUpdate` React hooks to process the entering and the leaving events in your component. You may also check `monitor.isOver({ shallow: true })` if don't want the nested drop targets to count.

#### Specification Method Parameters

* **`props`**: Your component's current props.

* **`monitor`**: An instance of [`DropTargetMonitor`](/docs-drop-target-monitor.html). Use it to query the information about the current drag state, such as the currently dragged item and its type, the current and initial coordinates and offsets, whether it is over the current target, and whether it can be dropped. Read the [`DropTargetMonitor` documentation](docs-drop-target-monitor.html) for a complete list of `monitor` methods, or read the [overview](/docs-overview.html) for an introduction to the monitors.

* **`component`**: When specified, it is the instance of your component. Use it to access the underlying DOM node for position or size measurements, or to call `setState`, and other component methods. It is purposefully missing from `canDrop` because the instance may not be available by the time it is called. If you want this method to depend on the component's state, consider lifting the state to the parent component, so that you could just use `props`. Generally your code will be cleaner if you rely on `props` instead whenever possible.

### The Collecting Function

Just specifying the drop target `types` and `spec` is not quite enough.  
There's still a few more things we need to take care of:

* attach React DnD event handlers to some node in the component;
* pass some knowledge about the dragging state to our component.

All communication between React components happens via props, so it makes sense that React DnD injects special props into your component. However it gives you the freedom to name them and decide what props your component will receive.

Your *collecting function* will be called by React DnD with a *connector* that lets you connect nodes to the DnD backend, and a *monitor* to query information about the drag state. It should return a plain object of props to inject into your component.

If you're new to these concepts, the [overview](/docs-overview.html) should give you a good idea about them.

#### Parameters

* **`connect`**: An instance of [`DropTargetConnector`](/docs-drop-target-connector.html). It only has a single `dropTarget()` method. It returns a function you need to pass down to your component to connect the target DOM node to the React DnD backend. If you return something like `{ connectDropTarget: connect.dropTarget() }` from your `collect` function, the component will receive `connectDropTarget` as a prop so you can mark the relevant node inside its `render()` as droppable: `return this.props.connectDropTarget(<div>...</div>)`. You can see this pattern in action in the example at the end of this file. Read the [`DropTargetConnector` documentation](docs-drop-target-connector.html) for a complete list of `connect` methods, or read the [overview](/docs-overview.html) for an introduction to the connectors.

* **`monitor`**: An instance of [`DropTargetMonitor`](/docs-drop-target-monitor.html). It is precisely the same `monitor` you receive in the drop target specification methods, and you can use it to query the information about the current drag state. Read the [`DropTargetMonitor` documentation](docs-drop-target-monitor.html) for a complete list of `monitor` methods, or read the [overview](/docs-overview.html) for an introduction to the monitors.

### Nesting Behavior

If a drop target is nested in another drop target, both `hover()` and `drop()` bubble from the innermost target up the chain. There is no way to cancel the propagation by design. Instead, any drop target may compare `monitor.isOver()` and `monitor.isOver({ shallow: true })` to verify whether a child, or just the current drop target is being hovered. When dropping, any drop target in the chain may check whether it is the first in chain by testing if `monitor.didDrop()` returns `false`. Any parent drop target may override the drop result specified by the child drop target by explicitly returning another drop result from `drop()`. If a parent target returns `undefined` from its `drop()` handler, it does not change the existing drop result that may have been specified by a nested drop target. The drop targets that return `false` from `canDrop()` are exluded from the `drop()` dispatch.

### Example

TODO


## Type Definitions

```js
type ReactProps = Object;

type DropTargetType =
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

DragSource: (
  type: DropTargetType,
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