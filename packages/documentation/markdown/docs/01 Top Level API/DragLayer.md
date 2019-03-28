---
path: '/docs/api/drag-layer'
title: 'DragLayer'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# DragLayer

**This is an advanced feature.**

For the most use cases, the default rendering of the [HTML5 backend](/docs/backends/html5) should suffice. However, its drag preview has certain limitations. For example, it has to be an existing node screenshot or an image, and it cannot change midflight.

Sometimes you might want to perform the custom rendering. This also becomes necessary if you're using a custom backend. `DragLayer` lets you perform the rendering of the drag preview yourself using just the React components. It is a higher-order component accepting one required parameter that is described below.

To use `DragLayer`, don't forget to wrap the top-level component of your app in a [`DragDropContext`](/docs/api/drag-drop-context).

### Signature

`DragLayer` uses partial application. After specifying its only parameter with the first call, you need to pass your React component class as the only parameter in the second call. This signature makes `DragLayer` usable as a decorator. Read the [overview](/docs/overview) for a more detailed explanation of the decorators and the higher-order components.

```jsx
import { DragLayer } from 'react-dnd'

class CustomDragLayer {
  /* ... */
}

export default DragLayer(collect)(CustomDragLayer)
```

### Parameters

- **`collect`**: Required. The collecting function. It should return a plain object of the props to inject into your component. It receives two parameters, `monitor` and `props`. Read the [overview](/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.

- **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)` function inside the `options` object can improve the performance. Unless you have performance problems, don't worry about it.

### The Collecting Function

The collecting function signature is similar to the collecting functions of [`DragSource`](/docs/api/drag-source) and [`DropTarget`](/docs/api/drop-target), except that it doesn't have a `connect` parameter because the drag layer is not interactive and only _reflects_ the drag state. The collecting function is called any time the global drag state changes, including the coordinate changes, so that your component can provide a timely updated custom drag preview. You can ask the `monitor` for the client coordinates of the dragged item.

#### Parameters

- **`monitor`**: An instance of [`DragLayerMonitor`](/docs/api/drag-layer-monitor). You can use it to query the information about the current drag state, including the coordinates. Read the [`DragLayerMonitor` documentation](/docs/api/drag-layer-monitor) for a complete list of `monitor` methods, or read the [overview](/docs/overview) for an introduction to the monitors.

### Return Value

`DragLayer` wraps your component and returns another React component.  
For easier [testing](/docs/testing), it provides an API to reach into the internals:

#### Static Properties

- **`DecoratedComponent`**: Returns the wrapped component type.

#### Instance Methods

- **`getDecoratedComponentInstance()`**: Returns the wrapped component instance.

### Example

```jsx
import React from 'react'
import ItemTypes from './ItemTypes'
import BoxDragPreview from './BoxDragPreview'
import snapToGrid from './snapToGrid'
import { DragLayer } from 'react-dnd'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}

function getItemStyles(props) {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform: transform,
    WebkitTransform: transform,
  }
}

function CustomDragLayer({ item, itemType, isDragging }) {
  if (!isDragging) {
    return null
  }

  function renderItem(type, item) {
    switch (type) {
      case ItemTypes.BOX:
        return <BoxDragPreview title={item.title} />
    }
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem(itemType, item)}</div>
    </div>
  )
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }
}

export default DragLayer(collect)(CustomDragLayer)
```
