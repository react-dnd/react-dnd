---
path: '/docs/api/drop-target-monitor'
title: 'DropTargetMonitor'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# DropTargetMonitor

`DropTargetMonitor` is an object passed to a collecting function of a [drop target](/docs/api/use-drop). Its methods let you get information about the drag state of a specific drop target. The specific drop target bound to that monitor is called the monitor's _owner_ below.

### Methods

- **`canDrop()`**: Returns `true` if there is a drag operation in progress, and the owner's `canDrop()` returns `true` or is not defined.

- **`isOver(options)`**: Returns `true` if there is a drag operation in progress, and the pointer is currently hovering over the owner. You may optionally pass `{ shallow: true }` to strictly check whether _only_ the owner is being hovered, as opposed to a nested target.

- **`getItemType()`**: Returns a string or a symbol identifying the type of the current dragged item. Returns `null` if no item is being dragged.

- **`getItem()`**: Returns a plain object representing the currently dragged item. Every drag source must specify it by returning an object from its `beginDrag()` method. Returns `null` if no item is being dragged.

- **`getDropResult()`**: Returns a plain object representing the last recorded drop result. The drop targets may optionally specify it by returning an object from their `drop()` methods. When a chain of `drop()` is dispatched for the nested targets, bottom up, any parent that explicitly returns its own result from `drop()` overrides the drop result previously set by the child. Returns `null` if called outside `drop()`.

- **`didDrop()`** Returns `true` if some drop target has handled the drop event, `false` otherwise. Even if a target did not return a drop result, `didDrop()` returns `true`. Use it inside `drop()` to test whether any nested drop target has already handled the drop. Returns `false` if called outside `drop()`.

- **`getInitialClientOffset()`**: Returns the `{ x, y }` client offset of the pointer at the time when the current drag operation has started. Returns `null` if no item is being dragged.

- **`getInitialSourceClientOffset()`**: Returns the `{ x, y }` client offset of the drag source component's root DOM node at the time when the current drag operation has started. Returns `null` if no item is being dragged.

- **`getClientOffset()`**: Returns the last recorded `{ x, y }` client offset of the pointer while a drag operation is in progress. Returns `null` if no item is being dragged.

- **`getDifferenceFromInitialOffset()`**: Returns the `{ x, y }` difference between the last recorded client offset of the pointer and the client offset when current the drag operation has started. Returns `null` if no item is being dragged.

- **`getSourceClientOffset()`**: Returns the projected `{ x, y }` client offset of the drag source component's root DOM node, based on its position at the time when the current drag operation has started, and the movement difference. Returns `null` if no item is being dragged.
