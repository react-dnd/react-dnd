---
path: '/docs/api/use-drag'
title: 'useDrag'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDrag

A hook to use the current component as a drag-source.

```jsx
import { useDrag } from 'react-dnd'

function DraggableComponent(props) {
  const [collectedProps, drag] = useDrag({
    item: { id, type },
  })
  return <div ref={drag}>...</div>
}
```

#### Parameters

- **`spec`** A specification object, see below for details on how to construct this

#### Return Value Array

- **`Index 0`**: An object containing collected properties from the collect function. If no `collect` function is defined, an empty object is returned.
- **`Index 1`**: A connector function for the drag source. This must be attached to the draggable portion of the DOM.
- **`Index 2`**: A connector function for the drag preview. This may be attached to the preview portion of the DOM.

### Specification Object Members

- **`item`**: Required. A plain JavaScript object describing the data being dragged. This is the _only_ information available to the drop targets about the drag source so it's important to pick the _minimal_ data they need to know. You may be tempted to put a complex reference here, but you should try very hard to avoid doing this because it couples the drag sources and drop targets. It's a good idea to return something like `{ type, id }` from this method.

  `item.type` **must be set**, and it must be either a string, an ES6 symbol`. Only the [drop targets](/docs/api/drop-target) registered for the same type will react to this item. Read the [overview](/docs/overview) to learn more about the items and types.

- **`previewOptions`**: Optional. A plain JavaScript object describing drag preview options.

* **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom`arePropsEqual(props, otherProps)`function inside the`options` object can improve the performance. Unless you have performance problems, don't worry about it.

* **`begin(monitor)`**: Optional. Fired when a drag operation begins. Nothing needs to be returned, but if an object is returned it will override the default `item` property of the spec.

* **`end(monitor)`**: Optional. When the dragging stops, `end` is called. For every `begin` call, a corresponding `end` call is guaranteed. You may call `monitor.didDrop()` to check whether or not the drop was handled by a compatible drop target. If it was handled, and the drop target specified a _drop result_ by returning a plain object from its `drop()` method, it will be available as `monitor.getDropResult()`. This method is a good place to fire a Flux action. _Note: If the component is unmounted while dragging, `component` parameter is set to be `null`._

* **`canDrag(monitor)`**: Optional. Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dragging based on some predicate over `props`. _Note: You may not call `monitor.canDrag()` inside this method._

* **`isDragging(monitor)`**: Optional. By default, only the drag source that initiated the drag operation is considered to be dragging. You can override this behavior by defining a custom `isDragging` method. It might return something like `props.id === monitor.getItem().id`. Do this if the original component may be unmounted during the dragging and later “resurrected” with a different parent. For example, when moving a card across the lists in a Kanban board, you want it to retain the dragged appearance—even though technically, the component gets unmounted and a different one gets mounted every time you move it to another list. _Note: You may not call `monitor.isDragging()` inside this method._

- **`collect`**: Optional. The collecting function. It should return a plain object of the props to return for injection into your component. It receives two parameters, `monitor` and `props`. Read the [overview](/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.
