---
path: "/docs/api/drag-drop-context-provider"
title: "DragDropContextProvider"
---
_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# DragDropContextProvider

As an alternative to the DragDropContext, you can use the DragDropContextProvider element
to set up React DnD for your application. Similar to the DragDropContext, this may be
injected with a backend via the `backend` prop, but it also can be injected with a `window` object.

### Usage

```js
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'

export default class YourApp {
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				/* ... */
			</DragDropContextProvider>
		)
	}
}
```

### Props

* **`backend`**: Required. A React DnD backend. Unless you're writing a custom one, you probably want to use the [HTML5 backend](/docs/backends/html5) that ships with React DnD.
* **`context`**: Optional. The backend context used to configure the backend. This is dependent on the backend implementation.
