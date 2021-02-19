---
path: '/docs/api/use-drag-layer'
title: 'useDrag'
---

<!--alex disable hook -->

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDragLayer

The `useDragLayer` hook allows you to wire a component into the DnD system as a _drag layer_.

```jsx
import { useDragLayer } from 'react-dnd'

function DragLayerComponent(props) {
  const collectedProps = useDragLayer(
    monitor => /* Collected Props */
  )
  return <div>...</div>
}
```

#### Parameters

- **`collect`**: Required. The collecting function. It should return a plain object of the props to return for injection into your component. It receives two parameters, `monitor` and `props`. Read the [overview](/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.

#### Return Value

An object of collected properties from the collect function.
