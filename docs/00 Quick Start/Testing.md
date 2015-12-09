*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

Testing
===================

React DnD is test-friendly. The whole drag and drop interaction, including the rendering of your components, as well as the side effects you perform in response to the drag and drop events, can be tested.

There are several different approaches to testing React components. React DnD is not opinionated and lets you use either of them. **Neither of those approaches require the browser event system to be available.**

A few test examples are included with the React DnD inside its `examples` folder. Run `npm install` and `npm test` inside the `react-dnd` root folder to start them.

### Testing the Components in Isolation

If you are only interested in testing the *rendering* of your components in isolation, and not their interaction, you may use the `DecoratedComponent` static property available on any class wrapped with React DnD to access the original class. You may then test it with the different props without any dependency on React DnD, supplying an identity function to stub the connector methods.

-------------------
```js
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');

it('can be tested independently', function () {
  // Obtain the reference to the component before React DnD wrapping
  var OriginalBox = Box.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  var identity = function (el) { return el; };

  // Render with one set of props and test
  var root = TestUtils.renderIntoDocument(
    <OriginalBox name='test'
                 connectDragSource={identity} />
  );
  var div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
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
-------------------
```js
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

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
-------------------

-------------------

### Testing the Drag and Drop Interaction

If you want to test the whole interaction, and not just the individual component rendering, you should use the [test backend](docs-test-backend.html). **The test backend does not require the DOM** so you can also use it with [`ReactShallowRenderer`](https://facebook.github.io/react/docs/test-utils.html#shallow-rendering) just fine.

This is currently the least documented part of React DnD because it exposes the underlying concepts from the [DnD Core](https://github.com/gaearon/dnd-core), the library powering React DnD inside. You can learn more about the test backend and its methods from the [DnD Core tests](https://github.com/gaearon/dnd-core/tree/v1.1.0/src/__tests__).

First, you need to install the test backend:

```
npm install --save-dev react-dnd-test-backend
```

Here is an example to get you started:

-------------------
```js
var React = require('react');
var Component = React.Component;
var TestBackend = require('react-dnd-test-backend');
var DragDropContext = require('react-dnd').DragDropContext;
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    React.createClass({
      render: function () {
        return <DecoratedComponent {...this.props} />;
      }
    })
  );
}

it('can be tested with the testing backend', function () {
  // Render with the test context that uses the test backend
  var BoxContext = wrapInTestContext(Box);
  var root = TestUtils.renderIntoDocument(<BoxContext name='test' />);

  // Obtain a reference to the backend
  var backend = root.getManager().getBackend();

  // Test that the opacity is 1
  let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.props.style.opacity).toEqual(1);

  // Find the drag source ID and use it to simulate the dragging operation
  var box = TestUtils.findRenderedComponentWithType(root, Box);
  backend.simulateBeginDrag([box.getHandlerId()]);

  // Optionally you can pass in a clientOffset for testing operations that
  // depend on mouse movements.
  // backend.simulateBeginDrag([box.getHandlerId()], {
  //   clientOffset: { x: 0, y: 0 },
  //   getSourceClientOffset: () => ({ x: 0, y: 0 }),
  // });

  // Verify that the div changed its opacity
  div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
  expect(div.props.style.opacity).toEqual(0.4);

  // See other backend.simulate* methods for more!
});
```
-------------------
```js
import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />;
      }
    }
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
  expect(div.props.style.opacity).toEqual(0.4);

  // See other backend.simulate* methods for more!
});
```
-------------------
```js
import React, { Component } from 'react';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

/**
 * Wraps a component into a DragDropContext that uses the TestBackend.
 */
function wrapInTestContext(DecoratedComponent) {
  @DragDropContext(TestBackend)
  class TestContextContainer extends Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }

  return TestContextContainer;
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
  expect(div.props.style.opacity).toEqual(0.4);

  // See other backend.simulate* methods for more!
});
```
-------------------
