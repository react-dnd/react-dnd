---
path: '/docs/api/use-drag-preview'
title: 'useDragPreview'
---

## EXPERIMENTAL API - UNSTABLE

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDragPreview

A hook to use the current component as a drag-layer.

```js
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd'
const { useDragPreview } = dnd

function DragLayerPreview(props) {
  const [DragPreview, preview] = useDragPreview(spec)
  const [collectedProps, ref] = useDrag({
    item: { id, type },
    preview,
  })

  return (
    <>
      <DragPreview />
      <div ref={ref}>...drag item...</div>
    </>
  )
}
```

#### Parameters

- **`dragPreview`** A refForwarding component that will render the drag preview.

#### Return Value Array

- **`Index 0`**: A component to render the dragPreview in your render method.
- **`Index 1`**: The drag preview ref object. This should be passed into useDrag's specification
