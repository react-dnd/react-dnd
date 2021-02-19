---
path: '/docs/api/decorators-overview'
title: 'Overview'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# Using the Decorators API

How do you wrap your components for use in React DnD?? What does wrapping even mean? If you have not worked with higher-order components before, go ahead and read [this article](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750), as it explains the concept in detail.

**A higher-order component is a function that takes a React component class, and returns another React component class.** The wrapping component provided by the library renders _your_ component in its `render` method and forwards the props to it, but also adds some useful behavior.

In React DnD, [`DragSource`](/docs/api/drag-source) and [`DropTarget`](/docs/api/drop-target), as well as a few other top-level exported functions, are in fact higher-order components. They breathe the drag and drop magic into your components.

One caveat of using them is that they require _two_ function applications. For example, here's how to wrap `YourComponent` in a [`DragSource`](/docs/api/drag-source):

```jsx
import { DragSource } from 'react-dnd'

class YourComponent {
  /* ... */
}

export default DragSource(/* ... */)(YourComponent)
```

Notice how, after specifying the [`DragSource`](/docs/api/drag-source) parameters in the first function call, there is a _second_ function call, where you finally pass your class. This is called [currying](http://en.wikipedia.org/wiki/Currying), or [partial application](http://en.wikipedia.org/wiki/Partial_application), and is necessary for the [decorator syntax](http://github.com/wycats/javascript-decorators) to work out of the box:

```jsx
import { DragSource } from 'react-dnd'

@DragSource(/* ... */)
export default class YourComponent {
  /* ... */
}
```

You don't have to use this syntax, but if you like it, you can enable it by transpiling your code with [Babel](http://babeljs.io), and putting `{ "stage": 1 }` into your [.babelrc file](https://babeljs.io/docs/usage/babelrc/).

Even if you don't plan to use decorators, the partial application can still be handy, because you can combine several [`DragSource`](/docs/api/drag-source) and [`DropTarget`](/docs/api/drop-target) declarations in JavaScript using a functional composition helper such as [`_.flow`](https://lodash.com/docs#flow). With decorators, you can stack the decorators to achieve the same effect.

```jsx
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'

class YourComponent {
  render() {
    const { connectDragSource, connectDropTarget } = this.props
    return connectDragSource(
      connectDropTarget()
      /* ... */
    )
  }
}

export default flow(DragSource(/* ... */), DropTarget(/* ... */))(YourComponent)
```

### Putting It All Together

Below is an example of wrapping an existing `Card` component into a drag source.

```jsx
import React from 'react'
import { DragSource } from 'react-dnd'

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card'
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.id }
    return item
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    CardActions.moveCardToList(item.id, dropResult.listId)
  }
}

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  }
}

function Card(props) {
  // Your component receives its own props as usual
  const { id } = props

  // These two props are injected by React DnD,
  // as defined by your `collect` function above:
  const { isDragging, connectDragSource } = props

  return connectDragSource(
    <div>
      I am a draggable card number {id}
      {isDragging && ' (and I am being dragged now)'}
    </div>
  )
}

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Card)
```
