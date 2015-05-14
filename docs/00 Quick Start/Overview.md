Overview
===================

React DnD is unlike most of the drag and drop libraries out there, and it can be intimidating if you've never used it before. However, once you get a taste of a few concepts at the heart of its design, it starts to make sense. I suggest you read about these concepts before the rest of the docs.

Some of these concepts may seem to have a certain familiarity to the ideas from the [Flux architecture](http://facebook.github.io/flux). This is not a coincidence, as React DnD uses Flux internally.

### Backends

React DnD is built on top of the [HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop). It is a reasonable default because it screenshots the dragged DOM node and uses it as a “drag preview” out of the box. It's handy because you don't have to do any drawing as the cursor moves. It also lets you handle the file drop events.

Unfortunately, the HTML5 drag and drop API also has some downsides. It does not work on touch screens, and it provides less customization opportunities on IE than in other browsers.

This is why the HTML5 drag and drop support is implemented in a pluggable way in React DnD. You don't have to use it. You can write a different implementation, based on touch events, mouse events, or something else entirely. Such pluggable implementations are called *backends* in React DnD. Only the [HTML5 backend](/docs-html5.html) comes with the library, but more may be added in the future.

Backends perform a similar role to that of React's synthetic event system: they abstract away the browser differences and process the native DOM events. Despite the similarities, React DnD backends do not have a dependency on React or its synthetic event system. Under the hood, all the backends do is translate the DOM events into the internal Flux actions that React DnD can process.

### Items and Types

Like Flux, React DnD uses data, and not the views, as the source of truth. When you drag something across the screen, we don't say that a component, or a DOM node is being dragged. Instead, we say that an *item* of a certain *type* is being dragged.

What is an item? An *item* is a plain JavaScript object *describing* what's being dragged. For example, in a Kanban board application, when you drag a card, an item might look like `{ cardId: 42 }`. In a Chess game, when you pick up a figure, the item might look like `{ fromCell: 'C5', figure: 'queen' }`. Describing the dragged data as a plain object helps you keep the components decoupled and unaware of each other.

What is a type, then? A *type* is a string (or a [symbol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)) uniquely identifying *a whole class of items* in your application. In a Kanban board app, you might have a `'card'` type representing the draggable cards and a `'list'` type for the draggable lists of those cards. In Chess, you might only have a single `'figure'` type.

Types are useful because, as your app grows, you might want to make more things draggable, but you don't necessarily want all the existing drop targets to suddenly start reacting to them. Types let you specify which drag sources and drop targets are compatible. You're probably going to have an enumeration of the type constants in your application, just like you may have an enumeration of Flux action types.

### Monitors

Drag and drop is inherently stateful. Either a drag operation is in progress, or it isn't. Either there is a current type and a current item, or there isn't. This state has to live somewhere.

React DnD exposes this state to your components via a few tiny wrappers over the internal state storage called the *monitors*. The monitors let you update the props of your components in response to the drag and drop state changes.

For each component that needs to track the drag and drop state, you can define a function that retrieves the relevant bits of it from the monitors. React DnD then takes care of timely calling your function and injecting the result into your components' props.

Let's say you want to highlight the Chess cells when a figure is being dragged. A *collecting function* for the `Cell` component might look like this:

-------------------
```js
function collect(monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver()
  };
}
```
-------------------

-------------------

-------------------

It instructs React DnD to pass the up-to-date values of `highlighted` and `hovered` to all the `Cell` instances as props.

### Connectors

If the backend handles the DOM events, but the components use React to describe the DOM, how does the backend know which DOM nodes to listen to? Enter *connectors*. Connectors let you assign one of the predefined roles (a drag source, a drag preview, or a drop target) to the DOM nodes in your `render` function.

In fact, a connector is passed as a second argument to the *collecting function* we described above. Let's see how we can use it to specify the drag source:

-------------------
```js
function collect(monitor, connect) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver(),
    connectDropTarget: connect.dropTarget()
  };
}
```
-------------------

-------------------

-------------------

In the component's `render` method, we are then able to access both the data obtained from the monitor, and the connecting function obtained from the connector:

-------------------
```js
render: function () {
  var highlighted = this.props.highlighted;
  var hovered = this.props.hovered;
  var connectDropTarget = this.props.connectDropTarget;

  return connectDropTarget(
    <div className={classSet({
      'Cell': true,
      'Cell--highlighted': highlighted,
      'Cell--hovered': hovered
    })}>
      {this.props.children}
    </div>
  );
}
```
-------------------
```js
render() {
  const { highlighted, hovered, connectDropTarget } = this.props;

  return connectDropTarget(
    <div className={classSet({
      'Cell': true,
      'Cell--highlighted': highlighted,
      'Cell--hovered': hovered
    })}>
      {this.props.children}
    </div>
  );
}
```
-------------------

-------------------

The `connectDropTarget` call tells React DnD that the root DOM node of our component is a valid drop target, and that its hover and drop events should be handled by the backend. Internally it works by attaching a React 0.13 callback ref to the React element that you pass as an argument, and notifying the backend any time the ref changes. The function returned by the connector is memoized, so it doesn't break the `shouldComponentUpdate` optimizations.

### Drag Sources and Drop Targets

So far we have covered the backends which work with the DOM, the data, as represented by the items and types, and the collecting functions that, thanks to the monitors and the connectors, let you describe what props React DnD should inject into your components.

But how do we configure our components to have those props injected automatically? How we perform the side effects in response to the drag and drop events? Where do the event handlers go? Meet the *drag sources* and the *drop targets*, the primary abstraction units of React DnD.

Whenever you want to make a component or some part of it draggable, you need to wrap that component into a *drag source* declaration. Every drag source is registered for a certain *type*, and has to implement a method producing an *item* from the component's props, and optionally a few other methods for handling the drag and drop events. The drag source declaration also lets you specify the *collecting function* for the given component.

Similarly, if you want some components to activate and receive the hover and the drop events when the items of the compatible types are being dragged, you need to wrap these components into the symmetrical *drop target* declarations.

### Higher-Order Components and ES7 decorators

How do you wrap your components? What does wrapping even mean? If you have not worked with higher-order components before, go ahead and read [this article](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750), as it explains the concept in detail.

A higher-order component is just a function that takes a React component class, and returns another React component class. The wrapping component provided by the library renders *your* component in its `render` method and forwards the props to it, but also adds some useful behavior.

In React DnD, [`DragSource`](/docs-drag-source.html) and [`DropTarget`](/docs-drop-target.html), as well as a few other top-level exported functions, are in fact higher-order components. One caveat of using them is that they require *two* function applications.

For example, here's how to wrap `YourClass` in a `DragSource`:

-------------------
```js
var DragSource = require('react-dnd').DragSource;

var YourComponent = React.createClass({ /* ... */ });
module.exports = DragSource(/* ... */)(YourComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';

class YourComponent { /* ... */ }
export default DragSource(/* ... */)(YourComponent);
```
-------------------

-------------------

Notice how, after specifying the `DragSource` parameters in the first function call, there is a *second* function call, where you finally pass your class.

This is called [currying](http://en.wikipedia.org/wiki/Currying), or [partial application](http://en.wikipedia.org/wiki/Partial_application), and is necessary for the [ES7 decorator syntax](github.com/wycats/javascript-decorators) to work out of the box:

-------------------

-------------------

-------------------
```js
import { DragSource } from 'react-dnd';

@DragSource(/* ... */)
export default class YourComponent { /* ... */ }
```
-------------------

You don't have to use this syntax, but if you like it, you can enable it by transpiling your code with [Babel](http://babeljs.io), and putting `{ "stage": 1 }` into your [.babelrc file](https://babeljs.io/docs/usage/babelrc/).

Even if you don't plan to use ES7, the partial application can still be handy, because you can combine several `DragSource` and `DropTarget` declarations in ES5 or ES6 using a functional composition helper such as [`_.compose`](https://lodash.com/docs#compose).

Finally, in ES7, you can just stack the decorators to achieve the same effect.

-------------------
```js
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;
var compose = require('lodash/function/compose');

var YourComponent = React.createClass({ /* ... */ });
module.exports = compose(
  DragSource(/* ... */),
  DropTarget(/* ... */)
)(YourComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';
class YourComponent { /* ... */ }

export default flow(
  DragSource(/* ... */)
  DropTarget(/* ... */)
)(YourComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';

@DragSource(/* ... */)
@DropTarget(/* ... */)
export default class YourComponent { /* ... */ }
```
-------------------
