---
path: '/docs/testing'
title: 'Testing'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# Testing

React DnD is test-friendly. The whole drag and drop interaction, including the rendering of your components, as well as the side effects you perform in response to the drag and drop events, can be tested.

There are several different approaches to testing React components. React DnD is not opinionated and lets you use any of them. **Not all approaches require that the browser event system be available.**

A few test examples are included with the React DnD inside its `examples` folder. Run `yarn install` and `yarn test` inside the `react-dnd` root folder to start them.

### Testing the Components in Isolation

If you are only interested in testing the _rendering_ of your components in isolation, and not their interaction, you may use the `DecoratedComponent` static property available on any class wrapped with React DnD to access the original class. You may then test it with the different props without any dependency on React DnD, supplying an identity function to stub the connector methods.

```jsx
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import expect from 'expect'
import Box from './components/Box'

it('can be tested independently', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalBox = Box.DecoratedComponent

  // Stub the React DnD connector functions with an identity function
  const identity = (el) => el

  // Render with one set of props and test
  let root = TestUtils.renderIntoDocument(
    <OriginalBox name="test" connectDragSource={identity} />
  )
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
  expect(div.props.style.opacity).toEqual(1)

  // Render with another set of props and test
  root = TestUtils.renderIntoDocument(
    <OriginalBox name="test" connectDragSource={identity} isDragging />
  )
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
  expect(div.props.style.opacity).toEqual(0.4)
})
```

### Testing the Drag and Drop Interaction

#### Test Backend

If you want to test the whole interaction, and not only the individual component rendering, you can use the [test backend](/docs/backends/test). **The test backend does not require the DOM** so you can also use it with [`ReactShallowRenderer`](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering).

This is currently the least documented part of React DnD because it exposes the underlying concepts from the [DnD Core](https://github.com/react-dnd/dnd-core), the library powering React DnD inside. You can learn more about the test backend and its methods from the [DnD Core tests](https://github.com/react-dnd/dnd-core/tree/v1.1.0/src/__tests__).

First, you need to install the test backend:

```
npm install --save-dev react-dnd-test-backend
```

Here are some examples to get you started:

```jsx
import React from 'react'
import { wrapInTestContext } from 'react-dnd-test-utils'
import { DragDropContext } from 'react-dnd'
import TestUtils from 'react-dom/test-utils'
import expect from 'expect'
import Box from './components/Box'

it('can be tested with the testing backend', () => {
  // Render with the test context that uses the test backend
  const BoxContext = wrapInTestContext(Box)
  const root = TestUtils.renderIntoDocument(<BoxContext name="test" />)

  // Obtain a reference to the backend
  const backend = root.getManager().getBackend()

  // Test that the opacity is 1
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
  expect(div.props.style.opacity).toEqual(1)

  // Find the drag source ID and use it to simulate the dragging operation
  const box = TestUtils.findRenderedComponentWithType(root, Box)
  backend.simulateBeginDrag([box.getHandlerId()])

  // Verify that the div changed its opacity
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
  expect(div.style.opacity).toEqual(0.4)

  // See other backend.simulate* methods for more!
})
```

#### Simulate the DOM

You can test drag and drop interactions using the [HTML 5 backend](/docs/backends/html5) or [touch backend](/docs/backends/touch) with [jsdom](https://github.com/jsdom/jsdom) in your testing library. Many testing libraries, like [Jest](https://jestjs.io/docs/en/configuration#testenvironment-string), use jsdom by default.

Note that jsdom does not have a DragEvent or [DataTransfer](https://github.com/jsdom/jsdom/issues/1568) object, which will affect the preview image during drag and file drag testing. Events interactions will also not properties to do with rendering, like element widths, or coordinates.

You can add these values to your event object properties yourself, however.

### Libraries

#### Enzyme

[Enzyme](https://github.com/airbnb/enzyme) is a commonly-used tool for testing React components.
Because of a [bug in Enzyme](https://github.com/airbnb/enzyme/issues/1852), you'll want to wrap your component in a fragment when you mount it.
You can then store a ref to your wrapped component and use this ref to access the current `DragDropMananger` instance and call its methods.

```jsx
const BoxContext = wrapInTestContext(Box)

const ref = React.createRef()
const root = Enzyme.mount(
  <>
    <BoxContext ref={ref} name="test" />
  </>
)

// ...

const backend = ref.current.getManager().getBackend()
```

#### React Testing Library

Here is an example of testing DOM interactions directly, using the HTML5 backend:

```jsx
render(<Board />)
let boardSquares = screen.getAllByRole('gridcell')
let dropSquare = boardSquares[0]
let knight = boardSquares[18].firstChild

fireEvent.dragStart(knight)
fireEvent.dragEnter(dropSquare)
fireEvent.dragOver(dropSquare)
fireEvent.drop(dropSquare)
```

If you need dataTransfer properties, these can also [be added](https://testing-library.com/docs/dom-testing-library/api-events).
