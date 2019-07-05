---
path: '/examples/drag-around/custom-drag-layer'
title: 'Custom Drag Layer'
---

The browser APIs provide no way to change the drag preview or its
behavior once drag has started. Libraries such as jQuery UI implement
the drag and drop from scratch to work around this, but react-dnd only
supports browser drag and drop “backend” for now, so we have to accept
its limitations.
We can, however, customize behavior a great deal if we feed the
browser an empty image as drag preview. This library provides a
`DragLayer` that you can use to implement a fixed layer on
top of your app where you'd draw a custom drag preview component.
Note that we can draw a completely different component on our drag
layer if we wish so. It's not just a screenshot.

With this approach, we miss out on default “return” animation when
dropping outside the container. However, we get great flexibility in
customizing drag feedback and zero flicker.

<view-source name="02-drag-around/custom-drag-layer" component="drag-around-custom-drag-layer">
</view-source>
