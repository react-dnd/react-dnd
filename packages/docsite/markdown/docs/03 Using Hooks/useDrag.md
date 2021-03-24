---
path: '/docs/api/use-drag'
title: 'useDrag'
---

<!--alex disable hook -->

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDrag

The `useDrag`hook provides a way to wire your component into the DnD system as a _drag source_. By passing in a specification into `useDrag`, you declaratively describe the `type` of draggable being generated, the `item` object representing the drag source, what props to `collect`, and more. The `useDrag` hooks returns a few key items: a set of collected props, and refs that may be attached to _drag source_ and _drag preview_ elements

```jsx
import { useDrag } from 'react-dnd'

function DraggableComponent(props) {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type,
    item: { id }
  }))
  return collected.isDragging ? (
    <div ref={dragPreview} />
  ) : (
    <div ref={drag} {...collected}>
      ...
    </div>
  )
}
```

#### Parameters

- **`spec`** A specification object or a function that creates a specification object. See below for details on the specification object
- **`deps`** A dependency array used for memoization. This behaves like the built-in `useMemo` React hook. The default value is an empty array for function spec, and an array containing the spec for an object spec.

#### Return Value Array

- **`[0] - Collected Props`**: An object containing collected properties from the collect function. If no `collect` function is defined, an empty object is returned.
- **`[1] - DragSource Ref`**: A connector function for the drag source. This must be attached to the draggable portion of the DOM.
- **`[2] - DragPreview Ref`**: A connector function for the drag preview. This may be attached to the preview portion of the DOM.

### Specification Object Members

- **`type`**: Required. This must be either a string or a symbol. Only the [drop targets](/docs/api/drop-target) registered for the same type will react to this item. Read the [overview](/docs/overview) to learn more about the items and types.

- **`item`**: Required _(object or function)_.

  - When this is an object, it is a plain JavaScript object describing the data being dragged. This is the _only_ information available to the drop targets about the drag source so it's important to pick the _minimal_ data they need to know. You may be tempted to put a complex reference here, but you should try very hard to avoid doing this because it couples the drag sources and drop targets. It's a good idea to use something like `{ id }`.
  - When this is a function, it is fired at the beginning of the drag operation and returns an object representing the drag operation (see first bullet). If null is returned, the drag operation is cancelled.

- **`previewOptions`**: Optional. A plain JavaScript object describing drag preview options.

* **`options`**: Optional. A plain object optionally containing any of the following properties:

  - **`dropEffect`**: Optional: The type of drop effect to use on this drag. ("move" or "copy" are valid values.)

* **`end(item, monitor)`**: Optional. When the dragging stops, `end` is called. For every `begin` call, a corresponding `end` call is guaranteed. You may call `monitor.didDrop()` to check whether or not the drop was handled by a compatible drop target. If it was handled, and the drop target specified a _drop result_ by returning a plain object from its `drop()` method, it will be available as `monitor.getDropResult()`. This method is a good place to fire a Flux action. _Note: If the component is unmounted while dragging, `component` parameter is set to be `null`._

* **`canDrag(monitor)`**: Optional. Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dragging based on some predicate over `props`. _Note: You may not call `monitor.canDrag()` inside this method._

* **`isDragging(monitor)`**: Optional. By default, only the drag source that initiated the drag operation is considered to be dragging. You can override this behavior by defining a custom `isDragging` method. It might return something like `props.id === monitor.getItem().id`. Do this if the original component may be unmounted during the dragging and later “resurrected” with a different parent. For example, when moving a card across the lists in a Kanban board, you want it to retain the dragged appearance—even though technically, the component gets unmounted and a different one gets mounted every time you move it to another list. _Note: You may not call `monitor.isDragging()` inside this method._

- **`collect`**: Optional. The collecting function. It should return a plain object of the props to return for injection into your component. It receives two parameters, `monitor` and `props`. Read the [overview](/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.
