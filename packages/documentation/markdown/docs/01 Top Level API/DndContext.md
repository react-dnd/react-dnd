---
path: '/docs/api/dnd-provider'
title: 'DndProvider'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# DndProvider

The DndProvider component provides React-DnD capabilities to your application. This must be
injected with a backend via the `backend` prop, but it may can be injected with a `window` object.

### Usage

```jsx
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

export default class YourApp {
  render() {
    return <DndProvider backend={HTML5Backend}>/* ... */</DndProvider>
  }
}
```

### Props

- **`backend`**: Required. A React DnD backend. Unless you're writing a custom one, you probably want to use the [HTML5 backend](/docs/backends/html5) that ships with React DnD.
- **`context`**: Optional. The backend context used to configure the backend. This is dependent on the backend implementation.
