---
path: "/docs/testing"
title: "Testing"
---
*New to React DnD? [Read the overview](/docs/overview) before jumping into the docs.*

Testing
===================

React DnD is test-friendly. The whole drag and drop interaction, including the rendering of your components, as well as the side effects you perform in response to the drag and drop events, can be tested.

There are several different approaches to testing React components. React DnD is not opinionated and lets you use either of them. **Neither of those approaches require the browser event system to be available.**

A few test examples are included with the React DnD inside its `examples` folder. Run `yarn` and `yarn test` inside the `react-dnd` root folder to start them.

### Testing the Components in Isolation

If you are only interested in testing the *rendering* of your components in isolation, and not their interaction, you may use the `DecoratedComponent` static property available on any class wrapped with React DnD to access the original class. You may then test it with the different props without any dependency on React DnD, supplying an identity function to stub the connector methods.

```js
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';
import Box from './components/Box';

it('can be tested independently', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalBox = Box.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = el => el;

  // Render with one set of props and test
  let root = TestUtils.renderIntoDocument(
    <OriginalBox name='test'
                 connectDragSource={identity} />
  );
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.props.style.opacity).toEqual(1);

  // Render with another set of props and test
  root = TestUtils.renderIntoDocument(
    <OriginalBox name='test'
                 connectDragSource={identity}
                 isDragging />
  );
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.props.style.opacity).toEqual(0.4);
});
```

### Testing the Drag and Drop Interaction

If you want to test the whole interaction, and not just the individual component rendering, you should use the [test backend](/docs/backends/test). **The test backend does not require the DOM** so you can also use it with [`ReactShallowRenderer`](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) just fine.

This is currently the least documented part of React DnD because it exposes the underlying concepts from the [DnD Core](https://github.com/react-dnd/dnd-core), the library powering React DnD inside. You can learn more about the test backend and its methods from the [DnD Core tests](https://github.com/react-dnd/dnd-core/tree/v1.1.0/src/__tests__).

First, you need to install the test backend:

```
npm install --save-dev react-dnd-test-backend
```

Here are some examples to get you started:

```js
import React from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect';
import Box from './components/Box';

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    () => <DecoratedComponent {...this.props} />
  );
}

it('can be tested with the testing backend', () => {
  // Render with the test context that uses the test backend
  const BoxContext = wrapInTestContext(Box);
  const root = TestUtils.renderIntoDocument(<BoxContext name='test' />);

  // Obtain a reference to the backend
  const backend = root.getManager().getBackend();

  // Test that the opacity is 1
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.props.style.opacity).toEqual(1);

  // Find the drag source ID and use it to simulate the dragging operation
  const box = TestUtils.findRenderedComponentWithType(root, Box);
  backend.simulateBeginDrag([box.getHandlerId()]);

  // Verify that the div changed its opacity
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.style.opacity).toEqual(0.4);

  // See other backend.simulate* methods for more!
});
```

### Testing with Enzyme

[Enzyme](https://github.com/airbnb/enzyme) is a commonly-used tool for testing React components.
To use it with react-dnd, you'll need to call `.instance()` on `mount`-ed nodes to access the react-dnd helper methods:
```js
var root = Enzyme.mount(<BoxContext name="test" />);

// ...

var backend = root.instance().getManager().getBackend();

// ...

backend.simulateHover([dustbin.instance().getHandlerId()]);
```
