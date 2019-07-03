---
path: '/docs/backends/touch'
title: 'Touch Backend'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# Touch Backend

The HTML5 backend does not support the touch events. So it will not work on tablet and mobile devices. You can use the `react-dnd-touch-backend` for touch devices.

### Installation

Run the following command to install the touch backend.

```
yarn add react-dnd-touch-backend
```

### Usage

```jsx
import TouchBackend from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'

class YourApp {
  <DndProvider backend={TouchBackend}>
    {/* Your application */}
  </DndProvider>
}
```
