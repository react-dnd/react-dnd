---
path: '/docs/api/use-drag-drop-manager'
title: 'useDragDropManager'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDragDropManager

This hook provides a user with access into the DnD system. The DragDropManager instance
is a singleton created by React DnD that contains access to state, monitors, the backend, etc..

```jsx
import { useDragDropManager } from 'react-dnd'

function Example() {
  // The manager provides access to all of React DnD's internals
  const dragDropManager = useDragDropManager()

  return <div>Example</div>
}
```


## Return Value

A singleton DragDropManager from Context.

### **`getMonitor()`**

return object of `DragDropMonitor`:

- **`subscribeToStateChange(listener, options?): Unsubscribe`**
- **`subscribeToOffsetChange(listener): Unsubscribe`**
- **`canDragSource(sourceId): boolean`**
- **`canDropOnTarget(targetId): boolean`** 
- **`isDragging()`**: Returns true if a drag operation is in progress, and either the owner initiated the drag, or its `isDragging()` is defined and returns true.
- **`isDraggingSource(sourceId)`**
- **`isOverTarget(targetId,options?: { shallow?: boolean})`** 
- **`getItemType()`**: Returns a string or a symbol identifying the type of the current dragged item. Returns null if no item is being dragged.
- **`getItem()`**: Returns a plain object representing the currently dragged item. Every drag source must specify it by returning an object from its `beginDrag()` method. Returns null if no item is being dragged.
- **`getSourceId()`**
- **`getTargetIds()`**:
- **`getDropResult()`** Returns a plain object representing the last recorded drop result. The drop targets may optionally specify it by returning an object from their `drop()` methods. When a chain of `drop()` is dispatched for the nested targets, bottom up, any parent that explicitly returns its own result from `drop()` overrides the child drop result previously set by the child. Returns null if called outside `endDrag()`.
- **`didDrop()`**: Returns true if some drop target has handled the drop event, false otherwise. Even if a target did not return a drop result, `didDrop()` returns true. Use it inside `endDrag()` to test whether any drop target has handled the drop. Returns false if called outside `endDrag()`.
- **`isSourcePublic(): boolean | null`**
- **`getInitialClientOffset(): XYCoord | null`**: Returns the { x, y } client offset of the pointer at the time when the current drag operation has started. Returns null if no item is being dragged.
- **`getInitialSourceClientOffset(): XYCoord | null`**: Returns the { x, y } client offset of the drag source component's root DOM node at the time when the current drag operation has started. Returns null if no item is being dragged.
- **`getClientOffset(): XYCoord | null`**: 	Returns the last recorded { x, y } client offset of the pointer while a drag operation is in progress. Returns null if no item is being dragged.
- **`getSourceClientOffset(): XYCoord | null`**: Returns the projected { x, y } client offset of the drag source component's root DOM node, based on its position at the time when the current drag operation has started, and the movement difference. Returns null if no item is being dragged.
- **`getDifferenceFromInitialOffset(): XYCoord | null`**: Returns the { x, y } difference between the last recorded client offset of the pointer and the client offset when the current drag operation has started. Returns null if no item is being dragged.

Example:

```jsx
const { isDragging } = useDragLayer((monitor) => ({
    isDragging: monitor.isDragging(),
}));

const dragDropManager = useDragDropManager();
const dndMonitor = dragDropManager.getMonitor();
const targetIds = isDragging ? dndMonitor.getTargetIds() : [];
```

### **`getBackend(): Backend`**

### **`getRegistry(): HandlerRegistry`**

### **`getActions(): DragDropActions`**

returns object of DragDropActions:

- **`beginDrag(sourceIds?,options?)`**
- **`publishDragSource()`**
- **`hover(targetIds, options?)`**
- **`drop(options?)`**
- **`endDrag()`**

### **`dispatch(action: any): void`**
