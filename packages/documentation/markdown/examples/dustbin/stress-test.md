---
path: "/examples/dustbin/stress-test"
title: "Stress Test"
---

[Browse the Source](https://github.com/react-dnd/react-dnd/tree/master/packages/documentation-examples/src/01%20Dustbin/Stress%20Test)

This example is similar to the previous one, but props of both the
drag sources and the drop targets change every second. It demonstrates
that React DnD keeps track of the changing props, and if a component
receives the new props, React DnD recalculates the drag and drop
state. It also shows how a custom `isDragging` implementation can make the drag source appear as dragged, even if the component that initiated the drag has received new props.
				

<dustbin-stress-test></dustbin-stress-test>