---
path: '/examples/sortable/stress-test'
title: 'Stress Test'
---

How many items can React DnD handle at the same time? There are a
thousand items in this list. With some optimizations like updating the
state inside a `requestAnimationFrame` callback, it can
handle a few thousand items without lagging. After that, you're
better off using virtual lists like
[fixed-data-table](https://github.com/facebook/fixed-data-table).

Luckily, React DnD is designed to work great with any virtual React
data list components because it doesn't keep any state in the
DOM.

This example does not scroll automatically but you can add the
scrolling with a parent drop target that compares
`component.getBoundingClientRect()` with
`monitor.getClientOffset()` inside its `hover`
handler. In fact, you are welcome to contribute this functionality to
this example!

<view-source name="04-sortable/stress-test" component="sortable-stress-test">
</view-source>
