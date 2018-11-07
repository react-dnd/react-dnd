---
path: "/examples/drag-around/naive"
title: "Naive"
---

[Browse the Source](https://github.com/react-dnd/react-dnd/tree/master/packages/documentation-examples/src/02%20Drag%20Around/Naive)

This example naively relies on browser drag and drop implementation
without much custom logic.

When the box is dragged, we remove its original DOM node by returning
`null` from `render()` and let browser draw the
drag preview. When the is released, we draw it at the new coordinates.
If you try to drag the box outside the container, the browser will
animate its return.

While this approach works for simple cases, it flickers on drop. This
happens because the browser removes the drag preview before we have a
chance to make the dragged item visible. This might not be a problem
if you dim the original item instead of hiding it, but it's
clearly visible otherwise.

If we want to add custom logic such as snapping to grid or bounds
checking, we can only do this on drop. There is no way for us to
control what happens to dragged preview once the browser has drawn it.
Check out the [csutom rendering example](/examples/drag-around/custom-drag-layer)  
if you'd rather trade more control for some more work.

<drag-around-naive></drag-around-naive>