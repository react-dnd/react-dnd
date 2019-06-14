---
path: '/examples/nesting/drag-sources'
title: 'Drag Sources'
---

You can nest the drag sources in one another. If a nested drag source
returns `false` from `canDrag`, its parent will
be asked, until a draggable source is found and activated. Only the
activated drag source will have its `beginDrag()` and
`endDrag()` called.

<view-source name="03-nesting/drag-sources" component="nesting-drag-sources">
</view-source>
