---
path: '/docs/api/drag-preview-image'
title: 'DragPreviewImage'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# DragPreviewImage

A Component to render an HTML `img` tag as a disconnected drag preview.

Under the hood this renders an image into a detached dom node using a React portal.

### Usage

```js
import HTML5Backend from 'react-dnd-html5-backend'
import { DragSource, DragPreviewImage } from 'react-dnd'

function DraggableHouse({ connectDragSource, connectDragPreview }) {
  return (
    <>
      <DragPreviewImage src="house_dragged.png" connect={connectDragPreview} />
      <div ref={connectDragSource}>🏠</div>
    </>
  )
}
export default DragSource(
  /* ... */
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
  }),
)
```

### Props

- **`connect`**: Required. The drag preview connector function
