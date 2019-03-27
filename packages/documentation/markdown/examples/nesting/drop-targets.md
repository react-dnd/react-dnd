---
path: '/examples/nesting/drop-targets'
title: 'Drop Targets'
---

[JavaScript](https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_js/03-nesting/drop-targets)
[TypeScript](https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/03-nesting/drop-targets)

Drop targets can, too, be nested in one another. Unlike the drag
sources, several drop targets may react to the same item being
dragged.

React DnD by design offers no means of stopping propagation. Instead, the drop targets may compare `monitor.isOver()` and `monitor.isOver({ shallow: false })` to learn if just them, or their nested targets, are being hovered. They may also check `monitor.didDrop()` and `monitor.getDropResult()` to learn if a nested target has already handled the drop, and even return a different drop result.

<nesting-drop-targets></nesting-drop-targets>
