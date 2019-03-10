---
path: '/docs/api/use-drag-layer'
title: 'useDrag'
---

## EXPERIMENTAL API - UNSTABLE

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# useDragLayer

A hook to use the current component as a drag-layer.

```js
import { __EXPERIMENTAL_DND_HOOKS_THAT_MAY_CHANGE_AND_BREAK_MY_BUILD__ as dnd } from 'react-dnd'
const { useDragLayer } = dnd

function DragLayerComponent(props) {
	const collectedProps = useDragLayer(spec)
	return <div>...</div>
}
```

#### Parameters

- **`collect`**: Required. The collecting function. It should return a plain object of the props to return for injection into your component. It receives two parameters, `monitor` and `props`. Read the [overview](/docs/overview) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.

#### Return Value

An object of collected properties from the collect function.
