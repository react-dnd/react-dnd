---
path: '/examples/dustbin/iframe'
title: 'iframe'
---

[JavaScript](https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_js/01-dustbin/single-target-in-iframe)
[TypeScript](https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_ts/01-dustbin/single-target-in-iframe)

This is the same simple example, but nested in an iframe.

When you are using the [react-dnd-html5-backend](/docs/backends/html5), you are limited to
drag-and-drop within a single HTML document.

Using react-dnd inside of an iframe requires using a [DragDropContextProvider](/docs/api/drag-drop-context-provider) within the iframe.

<dustbin-single-target-in-iframe></dustbin-single-target-in-iframe>
