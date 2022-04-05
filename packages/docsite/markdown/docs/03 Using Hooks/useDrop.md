---
path: '/docs/api/use-drop'
title: 'useDrop'
---

<!--alex disable hook -->

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDrop

The `useDrop` hook provides a way for you to wire in your component into the DnD system as a _drop target_. By passing in a specification into the `useDrop` hook, you can specify including what types of data items the drop-target will `accept`, what props to `collect`, and more. This function returns an array containing a ref to attach to the Drop Target node and the collected props.

```jsx
import { useDrop } from 'react-dnd'

function myDropTarget(props) {
  const [collectedProps, drop] = useDrop(() => ({
    accept
  }))

  return <div ref={drop}>Drop Target</div>
}
```

#### Parameters

- **`spec`** A specification object or a function that creates a specification object. See below for details on the specification object
- **`deps`** A dependency array used for memoization. This behaves like the built-in `useMemo` React hook. The default value is an empty array for function spec, and an array containing the spec for an object spec.

#### Return Value Array

- **`[0] - Collected Props`**: An object containing collected properties from the collect function. If no `collect` function is defined, an empty object is returned.
- **`[1] - DropTarget Ref`**: A connector function for the drop target. This must be attached to the drop-target portion of the DOM.

### Specification Object Members

- **`accept`**: Required. A string, a symbol, or an array of either. This drop target will only react to the items produced by the [drag sources](/docs/api/drag-source) of the specified type or types. Read the [overview](/docs/overview) to learn more about the items and types.

* **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)` function inside the `options` object can improve the performance. Unless you have performance problems, don't worry about it.

* **`drop(item, monitor)`**: Optional. Called when a compatible item is dropped on the target. You may either return undefined, or a plain object. If you return an object, it is going to become _the drop result_ and will be available to the drag source in its `endDrag` method as `monitor.getDropResult()`. This is useful in case you want to perform different actions depending on which target received the drop. If you have nested drop targets, you can test whether a nested target has already handled `drop` by checking `monitor.didDrop()` and `monitor.getDropResult()`. Both this method and the source's `endDrag` method are good places to fire Flux actions. This method will not be called if `canDrop()` is defined and returns `false`.

* **`hover(item, monitor)`**: Optional. Called when an item is hovered over the component. You can check `monitor.isOver({ shallow: true })` to test whether the hover happens over _only_ the current target, or over a nested one. Unlike `drop()`, this method will be called even if `canDrop()` is defined and returns `false`. You can check `monitor.canDrop()` to test whether this is the case.

* **`canDrop(item, monitor)`**: Optional. Use it to specify whether the drop target is able to accept the item. If you want to always allow it, omit this method. Specifying it is handy if you'd like to disable dropping based on some predicate over `props` or `monitor.getItem()`. _Note: You may not call `monitor.canDrop()` inside this method._

- **`collect`**: Optional. The collecting function. It should return a plain object of the props to return for injection into your component. It receives two parameters, `monitor` and `props`. Read the [overview](/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.
