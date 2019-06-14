---
path: '/examples/dustbin/stress-test'
title: 'Stress Test'
---

This example is similar to the previous one, but props of both the
drag sources and the drop targets change every second. It demonstrates
that React DnD keeps track of the changing props, and if a component
receives the new props, React DnD recalculates the drag and drop
state. It also shows how a custom `isDragging` implementation can make the drag source appear as dragged, even if the component that initiated the drag has received new props.

<view-source name="01-dustbin/stress-test" component="dustbin-stress-test">
</view-source>
