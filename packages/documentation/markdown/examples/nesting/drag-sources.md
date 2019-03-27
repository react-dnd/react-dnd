---
path: '/examples/nesting/drag-sources'
title: 'Drag Sources'
---

[JavaScript](https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_js/03-nesting/drag-sources)
[TypeScript](https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/03-nesting/drag-sources)

You can nest the drag sources in one another. If a nested drag source
returns `false` from `canDrag`, its parent will
be asked, until a draggable source is found and activated. Only the
activated drag source will have its `beginDrag()` and
`endDrag()` called.

<nesting-drag-sources></nesting-drag-sources>
