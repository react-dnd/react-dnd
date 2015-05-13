Overview
===================

React DnD is unlike many drag and drop libraries out there, and can be intimidating if you've never used it before. However, once you get a taste of a few concepts at the heart of its design, it starts to make sense. I suggest you read about these concepts before the rest of the docs.

Some of these concepts may seem to have a certain familiarity to the ideas from the [Flux architecture](http://facebook.github.io/flux). This is not a coincidence, as React DnD uses Flux internally.

### Backends

React DnD internally uses [HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop). It is a good default because it screenshots the dragged DOM node as a “drag preview” without you having to do any work to draw it. It is also the only way to handle dropping of files from the hard drive. Unfortunately, HTML5 drag and drop API also has downsides. It does not work on touch screens, and it provides less customization opportunities on IE than in other browsers.

This is why the HTML5 drag and drop support is implemented in a pluggable way in React DnD. You don't have to use it. You can write a different implementation, based on touch events, mouse events, or something else entirely. Such pluggable implementations are called *backends* in React DnD. Only the [HTML5 backend](/docs-html5.html) comes with the library, but more may be added in the future.

Backends perform a similar role to that of React's synthetic event system: they abstract away the browser differences and process the native DOM events. Despite the similarities, React DnD backends do not have a dependency on React or its synthetic event system. Under the hood, the backends translate the DOM events into the internal Flux actions that React DnD can process.

### Items and Types

Like Flux, React DnD uses data, and not views, as the source of truth. When you drag something across the screen, we don't say that a component, or a DOM node is being dragged. Instead, we say that an *item* of a certain *type* is being dragged.

What is an item? An *item* is a plain JavaScript object *describing* what's being dragged. For example, in a Kanban board application, when you drag a card, an item might look like `{ cardId: 42 }`. In a Chess game, when you pick up a figure, the item might look like `{ fromCell: 'C5', figure: 'queen' }`. Describing the dragged data as a plain object helps you keep the components decoupled and unaware of each other.

What is a type, then? A *type* is a string (or a [symbol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)) uniquely identifying *a whole class of items* in your application. In a Kanban board app, you might have a `'card'` type representing the draggable cards and a `'list'` type for the draggable lists of those cards. In Chess, you might only have a single `'figure'` type.

Types are useful because, as your app grows, you might want to make more things draggable, but you don't necessarily want all the existing drop targets to suddenly start reacting to them. Types let you specify which drag sources and drop targets are compatible. You're probably going to have an enumeration of the type constants in your application, just like you may have an enumeration of Flux action types.

### Drag Sources and Drop Targets

Drag sources and drop targets are the primary abstraction units of React DnD.

Whenever you want to make a component or some part of it draggable, you need to wrap that component into a **drag source** declaration. Every drag source is registered for a certain *type*, and has to implement a method producing an *item* from the component's `props`.

Similarly, if you want some components to activate and receive the hover and the drop events when the items of the compatible types are being dragged, you need to wrap these components into the **drop target** declarations.

### Higher-Order Components and ES7 decorators

How do you wrap your components? What does wrapping even mean? If you have not worked with higher-order components before, go ahead and read [this article](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750), as it explains the concept in detail.

A higher-order component is just a function that takes a React component class, and returns another React component class. The wrapping component provided by the library renders *your* component in its `render` method and forwards the props to it, but also adds some useful behavior.

In React DnD, [`DragSource`](/docs-drag-source.html) and [`DropTarget`](/docs-drop-target.html), as well as a few other top-level exported functions, are in fact higher-order components. One caveat of using them is that they require *two* function applications.

For example, here's how to wrap `YourClass` in a `DragSource`:

-------------------
```js
var DragSource = require('react-dnd').DragSource;

var YourComponent = React.createClass({ ... });
module.exports = DragSource(...)(YourComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';

class YourComponent { ... }
export default DragSource(...)(YourComponent);
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

@DragSource(...)
export default class YourComponent { ... }
```
-------------------

You don't have to use this syntax, but if you like it, you can enable it by transpiling your code with [Babel](http://babeljs.io), and putting `{ "stage": 1 }` into your [.babelrc file](https://babeljs.io/docs/usage/babelrc/).

Even if you don't plan to use ES7, the partial application can still be handy, because you can combine several `DragSource` and `DropTarget` declarations in ES5 or ES6 using a functional composition helper such as [`_.flow`](https://lodash.com/docs#flow).

Finally, in ES7, you can just stack the decorators to achieve the same effect.

-------------------
```js
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;
var flow = require('lodash/function/flow');

var YourComponent = React.createClass({ ... });
module.exports = flow(
  DragSource(...),
  DropTarget(...)
)(YourComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';
class YourComponent { ... }

export default flow(
  DragSource(...)
  DropTarget(...)
)(YourComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';

@DragSource(...)
@DropTarget(...)
export default class YourComponent { ... }
```
-------------------

### Monitors and Connectors

TODO