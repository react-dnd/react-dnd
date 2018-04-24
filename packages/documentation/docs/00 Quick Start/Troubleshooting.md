Troubleshooting
===================

This page is dedicated to the problems you might bump into while using React DnD.

<!-- Do not edit title. It is referenced from the code. -->
### Could not find the drag and drop manager in the context

There are several ways this error might have happened:

1. You wrapped some component with a [`DragSource`](docs-drag-source.html), [`DropTarget`](docs-drop-target.html), or [`DragLayer`](docs-drag-layer.html), but forgot to wrap your top-level component with the [`DragDropContext`](docs-drag-drop-context.html).

2. You *have* wrapped the top-level component with the [`DragDropContext`](docs-drag-drop-context.html) but exported an unwrapped version by mistake.

3. You are using a component in an isolated environment like a unit test. See the second point for instructions to stub it.

4. The context is lost for some other reason. [Please file an issue](https://github.com/react-dnd/react-dnd/issues/new) if you can reproduce it on a small project.

#### Wrap top-level component with a `DragDropContext`

To fix this error, find the top-level component in your app. Usually, this is the root route handler. It doesn't have to be the topmost component, but it has to be higher in the hierarchy than any of your component using React DnD. Wrap this component with a [`DragDropContext`](docs-drag-drop-context.html) call. It is important to specify a *backend* as the only argument in that call. Currently React DnD only provides an [`HTML5` backend](docs-html5-backend.html), but touch backend support is coming in the future.

#### Stub the context inside the unit tests

If you have this error in a test, [read the testing guide](docs-testing.html) for instructions on stubbing the context.

#### Make sure you that don't have duplicate React

This problem may also appear if you have a duplicate React installation in your Browserify or Webpack build. [This article](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375) explains both the problem and the solution to it.

### React DnD does not provide a default export

React DnD does not provide a [default export](http://www.2ality.com/2014/09/es6-modules-final.html).
Mind the difference:

-------------------
```js
// Wrong:
var DragSource = require('react-dnd');

// Correct:
var DragSource = require('react-dnd').DragSource;
```
-------------------
```js
// Wrong:
import DragSource from 'react-dnd';

// Correct:
import { DragSource } from 'react-dnd';
```
-------------------

-------------------

### You seem to be applying the arguments in the wrong order

For the [`DragSource`](docs-drag-source.html), [`DropTarget`](docs-drop-target.html), [`DragLayer`](docs-drag-layer.html), and the [`DragDropContext`](docs-drag-drop-context.html), it is important that you first pass them the configuration arguments, and *then* inject your React component in a second call.

-------------------
```js
// Wrong:
module.exports = DragSource(YourComponent)(/* ... */);
module.exports = DragSource(YourComponent, /* ... */);

// Correct:
module.exports = DragSource(/* ... */)(YourComponent);
```
-------------------
```js
// Wrong:
export default DragSource(YourComponent)(/* ... */);
export default DragSource(YourComponent, /* ... */);

// Correct:
export default DragSource(/* ... */)(YourComponent);
```
-------------------

-------------------

Remember, **the component comes last!**

You may ask why I chose such a weird API. In fact it's not *too* weird, but the neat part about it is that, if you enable the [ES7 decorators](https://github.com/wycats/javascript-decorators) in [Babel](https://babeljs.io) by putting `{ "stage": 1 }` in your [.babelrc file](https://babeljs.io/docs/usage/babelrc/), you can write them naturally:

-------------------

-------------------

-------------------
```js
@DragSource(/* ... */)
export default class YourComponent { }
```
-------------------

You may not use ES7 decorators today (linters don't understand them), but this API lets you switch to the decorators when they are more mature, and also has [nicer composition semantics](docs-faq.html#how-do-i-combine-several-drag-sources-and-drop-targets-in-a-single-component-) in ES5 or ES6.

### I both see my customized DragLayer and browser's default drag preview 

You probably added `<YourCustomizedDragLayer />` component inside [`DragDropContext`](docs-drag-drop-context.html) wrapped component. That is why you are seeing your custom drag preview. However you didn't stop browser from drawing default drag preview. To make this happen, use dragPreview() from [`DragSourceConnector`](docs-drag-source-connector.html). 

Here is one example. At componentDidMount cycle, give an emptyImage and your custom drag layer will only be rendered. other way is to wrap node/element directly from render function. For more information, checkout [`DragSourceConnector`](docs-drag-source-connector.html) and the example https://github.com/react-dnd/react-dnd/tree/master/packages/documentation/examples/02%20Drag%20Around/Custom%20Drag%20Layer

```js
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

@DragSource(type, spec, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  // use dragPreview() here so that you can use it as props. From DragSource's collect function, you get DragSourceConnector and can access to dragPreview()
  connectDragPreview: connect.dragPreview(),
}))
class DragLayerExample {
  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true,
    })
  }
  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div>
        Your draggable component here 
      </div>
    );
  }
}
```
