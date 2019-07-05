---
path: '/about'
title: 'React DnD'
---

React DnD is a set of React utilities to help you build complex drag and drop interfaces while keeping your components decoupled. It is a perfect fit for apps like Trello and Storify, where dragging transfers data between different parts of the application, and the components change their appearance and the application state in response to the drag and drop events.

## Installation

```bash
# Using new-hotness ESModules
yarn add react-dnd react-dnd-html5-backend
```

```bash
# Using legacy, node-friendly CommonJS
yarn add react-dnd-cjs react-dnd-html5-backend-cjs
```

The second package will allow React DnD [the HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop) under the hood. You may choose to use a third-party backend instead, such as [the touch backend](https://github.com/yahoo/react-dnd-touch-backend).

## What's It Look Like?

```jsx
// Let's make <Card text='Write the docs' /> draggable!

import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './Constants'

/**
 * Your Component
 */
export default function Card({ isDragging, text }) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.CARD, text },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })
  return (
    <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
  )
}
```

## Features

### It works with your components

Instead of providing readymade widgets, React DnD wraps your components and injects props into them. If you use React Router or Flummox, you already know this pattern.

### It embraces unidirectional data flow

React DnD fully embraces the declarative rendering paradigm of React and doesn't mutate the DOM. It is a great complement to Redux and other architectures with the unidirectional data flow. In fact it is built on Redux.

### It hides the platform quirks

HTML5 drag and drop has an awkward API full of pitfalls and browser inconsistencies. React DnD handles them internally for you, so you can focus on developing your application instead of working around the browser bugs.

### It is extensible and testable

React DnD uses the HTML5 drag and drop under the hood, but it also lets you supply a custom “backend”. You can create a custom DnD backend based on the touch events, the mouse events, or something else entirely. For example, a built-in simulation backend lets you test drag and drop interaction of your components in a Node environment.

## Touch Support

For touch support, use React DnD with [the touch backend](https://github.com/yahoo/react-dnd-touch-backend) instead of the HTML5 backend.

## Non-Goals

React DnD gives you a set of powerful primitives, but it does not contain any readymade components. It's lower level than [jQuery UI](https://jqueryui.com/) or [interact.js](http://interactjs.io/) and is focused on getting the drag and drop interaction right, leaving its visual aspects such as axis constraints or snapping to you. For example, React DnD doesn't plan to provide a `Sortable` component. Instead it makes it easy for you to build your own, with any rendering customizations that you need.

## Support and Contributions

Issues and potential improvements are discussed on [Github](https://github.com/react-dnd/react-dnd/issues).

## Thanks

Big thanks to [BrowserStack](https://www.browserstack.com) for letting the maintainers use their service to debug browser issues.

## License

React DnD is licensed as MIT. Use it as you will.
