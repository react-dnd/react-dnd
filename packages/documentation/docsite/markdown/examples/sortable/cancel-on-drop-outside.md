---
path: '/examples/sortable/cancel-on-drop-outside'
title: 'Cancel on Drop Outside'
---

Because you write the logic instead of using the ready-made components,
you can tweak the behavior to the one your app needs.

In this example, instead of moving the card inside the drop target's `drop()` handler, we do it inside the drag source's `endDrag()` handler. This let us check `monitor.didDrop()` and revert the drag operation if the card was dropped outside its container.

<view-source name="04-sortable/cancel-on-drop-outside" component="sortable-cancel-on-drop-outside">
</view-source>
