*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

DragSourceMonitor
===================

`DragSourceMonitor` is an object passed to a collecting function of the [`DragSource`](docs-drag-source.html). Its methods let you get information about the drag state of a specific drag source. The specific drag source bound to that monitor is called the monitor's *owner* below.

### Methods

* **`canDrag()`**: Returns `true` if no drag operation is in progress, and the owner's `canDrag()` returns `true` or is not defined.

* **`isDragging()`**: Returns `true` if there is a drag operation is in progress, and either the owner initiated the drag, or its `isDragging()` is defined and returns `true`.

* **`getItemType()`**: Returns a string or an ES6 symbol identifying the type of the current dragged item. Returns `null` if no item is being dragged.

* **`getItem()`**: Returns a plain object representing the currently dragged item. Every drag source must specify it by returning an object from its `beginDrag()` method. Returns `null` if no item is being dragged.

* **`getDropResult()`**: Returns a plain object representing the last recorded drop result. The drop targets may optionally specify it by returning an object from their `drop()` methods. When a chain of `drop()` is dispatched for the nested targets, bottom up, any parent that explicitly returns its own result from `drop()` overrides the child drop result previously set by the child. Returns `null` if called outside `endDrag()`.

* **`didDrop()`** Returns `true` if some drop target has handled the drop event, `false` otherwise. Even if a target did not return a drop result, `didDrop()` returns `true`. Use it inside `endDrag()` to test whether any drop target has handled the drop. Returns `false` if called outside `endDrag()`.

* **`getInitialClientOffset()`**: Returns the `{ x, y }` client offset of the pointer at the time when the current drag operation has started. Returns `null` if no item is being dragged.

* **`getInitialSourceClientOffset()`**: Returns the `{ x, y }` client offset of the drag source component's root DOM node at the time when the current drag operation has started. Returns `null` if no item is being dragged.

* **`getClientOffset()`**: Returns the last recorded `{ x, y }` client offset of the pointer while a drag operation is in progress. Returns `null` if no item is being dragged.

* **`getDifferenceFromInitialOffset()`**: Returns the `{ x, y }` difference between the last recorded client offset of the pointer and the client offset when current the drag operation has started. Returns `null` if no item is being dragged.

* **`getSourceClientOffset()`**: Returns the projected `{ x, y }` client offset of the drag source component's root DOM node, based on its position at the time when the current drag operation has started, and the movement difference. Returns `null` if no item is being dragged.
