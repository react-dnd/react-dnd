---
path: '/docs/api/use-drag-drop-manager'
title: 'useDragDropManager'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDragDropManager

This hook provides a user with access into the DnD system. The DragDropManager instance
is a singleton created by React DnD that contains access to state, monitors, the backend, etc..

[View Source](https://github.com/react-dnd/react-dnd/blob/main/packages/react-dnd/src/hooks/useDragDropManager.ts)

```jsx
import { useDragDropManager } from 'react-dnd'

function Example() {
  /*
  interface DragDropManager {
    getMonitor(): DragDropMonitor
    getBackend(): Backend
    getRegistry(): HandlerRegistry
    getActions(): DragDropActions
    dispatch(action: any): void
  } 
  */
  const dragDropManager = useDragDropManager()

  return <div>Example</div>
}
```
