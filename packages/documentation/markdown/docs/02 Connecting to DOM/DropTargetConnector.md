---
path: '/docs/api/drop-target-connector'
title: 'DropTargetConnector'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# DropTargetConnector

`DropTargetConnector` is an object passed to the _collecting function_ of the [`DropTarget`](/docs/api/drop-target). It provides the ability to bind your React component to the Drop Target role.

## Properties

- **`dropTarget() => (Element | Node | Ref)`**: Returns a function that must be prop-injected into your component and used in that component's `render()` method. You may pass this function a react component, an DOM element, or a ref object to this method.

## Usage

```jsx
import React from 'react'
import { DropTarget } from 'react-dnd'

class DropZone {
  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(<div>You can drop here!</div>)
  }
}

export default DropTarget(
  ItemTypes.Item,
  {
    /*...*/
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(DropZone)
```

### Examples

Check out [the tutorial](/docs/tutorial) for more real examples!
