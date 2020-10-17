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
npm install react-dnd-touch-backend
```

### Usage

```jsx
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'

class YourApp {
  <DndProvider backend={TouchBackend} options={opts}>
    {/* Your application */}
  </DndProvider>
}
```

### Options

- **enableTouchEvents**(default: true)

  A flag indicating whether touch-based event processing is enabled.

- **enableMouseEvents**(default: false)

  A flag indicating whether to enable click-based event processing.

  **NOTE**: This is buggy due to the difference in touchstart/touchend event propagation compared to mousedown/mouseup/click.

- **enableKeyboardEvents** (default: false)

  A flag indicating whether to enable keyboard event processing.

- **delay** (default: 0)

  The amount in ms to delay processing for all events

- **delayTouchStart** (default: 0)

  The amount in ms to delay processing of touch events

- **delayMouseStart** (default: 0)

  The amount in ms to delay processing of mouse events

- **touchSlop** (default: 0)

  Specifies the pixel distance moved before a drag is signaled.

- **ignoreContextMenu** (default: false)

  If true, prevents the contextmenu event from canceling a drag.

- **scrollAngleRanges**: (default: undefined)

  Specifies ranges of angles in degrees that drag events should be ignored. This is useful when you want to allow the user to scroll in a particular direction instead of dragging. Degrees move clockwise, 0/360 pointing to the left.

  ```jsx
  // allow vertical scrolling
  const options = {
    scrollAngleRanges: [
      { start: 30, end: 150 },
      { start: 210, end: 330 }
    ]
  }
  // allow horizontal scrolling
  const options = {
    scrollAngleRanges: [{ start: 300 }, { end: 60 }, { start: 120, end: 240 }]
  }
  ```

- **enableHoverOutsideTarget**: (default: undefined)

  Continue dragging of currently dragged element when pointer leaves DropTarget area

- **getDropTargetElementsAtPoint** (default: undefined) - uses document.elementsFromPoint or polyfill

  Specify a custom function to find drop target elements at the given point. Useful for improving performance in environments (iOS Safari) where document.elementsFromPoint is not available.

  ```jsx
  const hasNative =
    document && (document.elementsFromPoint || document.msElementsFromPoint)

  function getDropTargetElementsAtPoint(x, y, dropTargets) {
    return dropTargets.filter(t => {
      const rect = t.getBoundingClientRect()
      return (
        x >= rect.left &&
        x <= rect.right &&
        y <= rect.bottom &&
        y >= rect.top
      )
    })
  }

  // use custom function only if elementsFromPoint is not supported
  const backendOptions = {
    getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint,
  }

  <DndProvider
    backend={TouchBackend}
    options={backendOptions}>
    /* your react application */
  </DndProvider>
  ```
