---
path: '/docs/api/use-drag-preview'
title: 'useDragPreview'
---

## EXPERIMENTAL API - UNSTABLE

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDragPreview

A hook to use the current component as a drag-layer.

```js
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ } from 'react-dnd'
const {
	useDragPreview,
} = __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__

function myDragLayer(props) {
  const [preview, DragPreview] = useDragPreview(spec)
  const collectedProps = useDrag({
    ...
    preview
  })

  return (
    <>
      <DragPreview/>
      <... rest of item... />
    </>
  )
}
```

#### Parameters

- **`dragPreview`** A refForwarding component that will render the drag preview.

#### Return Value Array

- **`Index 0`**: The drag preview ref object. This should be passed into useDrag's specification
- **`Index 1`**: A component to render the dragPreview in your render method.
