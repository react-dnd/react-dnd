*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

FAQ
===================

## Usage

### What is the @ syntax I see in the ES7 code examples?

First of all, you don't have to use ES6 or ES7 for React DnD. They make some of the code patterns more succinct, but it's up to you whether to enable these transformations.

When I say “ES7”, I mean ES6 + a few extensions that *might* make it into ES7 (also known as ES2016). What I mark as the ES7 code in the docs is actually ES6 code + [class properties](https://gist.github.com/jeffmo/054df782c05639da2adb) + [decorators](https://github.com/wycats/javascript-decorators). You can enable these features by putting `{ "stage": 0 }` into your [.babelrc](https://babeljs.io/docs/usage/babelrc/) file. You can also [enable them individually](https://babeljs.io/docs/usage/experimental/).

The `@` syntax desugars into the simple function calls.  
You can see that in every example on the website that uses it, such as:

-------------------
```js
var DragSource = require('react-dnd').DragSource;

var MyComponent = React.createClass({
  /* ... */
});

module.exports = DragSource(type, spec, collect)(MyComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';

class MyComponent {
  /* ... */
}

export default DragSource(type, spec, collect)(MyComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';

@DragSource(type, spec, collect)
export default class MyComponent {
  /* ... */
}
```
-------------------

### Where do I get the precompiled version?

If you use [npm](http://npmjs.com):

```
npm install --save react-dnd
npm install --save react-dnd-html5-backend
```

The npm packages default to the CommonJS build. However they also include pre-minified UMD builds in the `dist` folders. The UMD builds export global `window.ReactDnD` and `window.ReactDnDHTML5Backend` respectively.

If you’d rather not use npm, you can use [npmcdn](http://npmcdn.com/) to access the UMD builds directly: [ReactDnD.min.js](https://npmcdn.com/react-dnd@latest/dist/ReactDnD.min.js) and [ReactDnDHTML5Backend.min.js](https://npmcdn.com/react-dnd-html5-backend@latest/dist/ReactDnDHTML5Backend.min.js). You may point your Bower config to them.

### How do I test React DnD components and their interaction?

See the [testing](docs-testing.html) tutorial for examples.

### How do I make the component draggable only by a small handle?

Specify the container node as the `dragPreview`, but only make the drag handle a `dragSource()`.  
See the [custom drag handle example](examples-customize-handles-and-previews.html).

### How do I constrain the drag preview movement?

By default, you can't constrain the drag preview movement because the drag preview is drawn by the browser. You can, however, use a [custom drag layer](examples-drag-around-custom-drag-layer.html) where you're free to rendering anything, with any snapping or constraints.

### How do I register a drag source or a drop target when the type depends on props?

Both [`DragSource`](docs-drag-source.html) and [`DropTarget`](docs-drop-target.html) let you pass a function as the first parameter instead of a string or a symbol. If you pass a function, it will be given the current props, and it should return a string, a symbol, or (for drop targets only) an array of either.

### How do I combine several drag sources and drop targets in a single component?

Because [`DragSource`](docs-drag-source.html) and [`DropTarget`](docs-drop-target.html) use the partial application, you may compose them using a functional composition helper such as [`_.flow`](https://lodash.com/docs#flow). In ES7, you can just stack the decorators to achieve the same effect.

-------------------
```js
var DragSource = require('react-dnd').DragSource;
var DropTarget = require('react-dnd').DropTarget;
var flow = require('lodash/flow');

var YourComponent = React.createClass({
  /* ... */
});

module.exports = flow(
  DragSource(/* ... */),
  DropTarget(/* ... */)
)(YourComponent);
```
-------------------
```js
import { DragSource } from 'react-dnd';
import flow from 'lodash/flow';

class YourComponent {
  /* ... */
}

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
export default class YourComponent {
  /* ... */
}
```
-------------------

### How do I register a drop target for the native files?

If you are using the [HTML5 backend](docs-html5-backend.html), you can register a drop target for one of the `NativeTypes` it exports:

-------------------
```js
var React = require('react');
var NativeTypes = require('react-dnd-html5-backend').NativeTypes;
var DropTarget = require('react-dnd').DropTarget;

var fileTarget = {
  drop: function (props, monitor) {
    console.log(monitor.getItem().files);
  }
};

var FileDropZone = React.createClass({
  render() {
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;
    var canDrop = this.props.canDrop;

    return connectDropTarget(
      <div>
        {!isOver && !canDrop && 'Drag files from the hard drive'}
        {!isOver && canDrop && 'Drag the files here'}
        {isOver && 'Drop the files'}
      </div>
    );
  }
});

module.exports = DropTarget(NativeTypes.FILE, fileTarget, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
})(FileDropZone);
```
-------------------
```js
import React, { Component } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';

const fileTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem().files);
  }
};

class FileDropZone extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div>
        {!isOver && !canDrop && 'Drag files from the hard drive'}
        {!isOver && canDrop && 'Drag the files here'}
        {isOver && 'Drop the files'}
      </div>
    );
  }
}

export default DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(FileDropZone);
```
-------------------
```js
import React, { Component } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget } from 'react-dnd';

const fileTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem().files);
  }
};

@DropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
export default class FileDropZone extends Component {
  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    return connectDropTarget(
      <div>
        {!isOver && !canDrop && 'Drag files from the hard drive'}
        {!isOver && canDrop && 'Drag the files here'}
        {isOver && 'Drop the files'}
      </div>
    );
  }
}
```
-------------------

### How do I write a custom backend?

This is not currently documented, but you can take cues from the [HTML5](docs-html5-backend.html) and [Test](docs-test-backend.html) backend implementations. The backend contract includes `setup()` and `teardown()` methods, and `connectDragSource()`, `connectDragPreview()` and `connectDropTarget()` methods that pass the DOM nodes to the backend. Contributions to the documentation are welcome.

### I am getting a “Super expression must either be null or a function, not undefined” error

React DnD requires React 0.13. Make sure you are using at least that version.

### Why won't my static methods and properties work?

Consider this example:

-------------------
```javascript
var Page = React.createClass({
  statics: {
    willTransitionTo: function (transition, params) {
      /* ... */
    },
  },

  render: function () {
    /* ... */
  }
});

module.exports = DragDropContext(HTML5Backend)(Page);
```
-------------------
```javascript
class Page {
  static willTransitionTo(transition, params) {
    /* ... */
  }

  render() {
    /* ... */
  }
}

export default DragDropContext(HTML5Backend)(Page);
```
-------------------
```javascript
@DragDropContext(HTML5Backend)
export default class Page {
  static willTransitionTo(transition, params) {
    /* ... */
  }

  render() {
    /* ... */
  }
}
```
-------------------

It might surprise you that your route handler's `willTransitionTo` (or a similar method) won't get triggered in this case! React DnD doesn't proxy your components' static methods and properties. This is too fragile and full of edge cases, so you must do it yourself. It's not hard! Just put your statics onto the components returned by React DnD instead:

-------------------
```javascript
var Page = React.createClass({
  render: function () {
    /* ... */
  }
});

Page = DragDropContext(HTML5Backend)(Page);
Page.willTransitionTo = function (transition, params) {
  /* ... */
};

module.exports = Page;
```
-------------------
```javascript
class Page {
  render() {
    /* ... */
  }
}

Page = DragDropContext(HTML5Backend)(Page);
Page.willTransitionTo = function (transition, params) {
  /* ... */
}

export default Page;
```
-------------------
```javascript
// You can write your own decorator like this
function assignStatics(a) {
  return b => Object.assign(b, a)
}

@assignStatics({
  willTransitionTo(transition, params) {
    /* ... */
  }
})
@DragDropContext(HTML5Backend)
export default class Page {
  render() {
    /* ... */
  }
}
```
-------------------

## Meta

### Is this Dungeons & Dragons?

I know, it's only drag and drop, [but I like it](http://www.youtube.com/watch?v=JGaBlygm0UY).

### How stable is it?

[Stampsy](http://stampsy.com) has been using this library, as well as its non-React predecessor that it was based on, since 2013. It's central to the Stampsy user experience, because all the content is created in a drag and drop post editor that uses React DnD.

### What is the roadmap?

The library is pretty much complete, and there are no new big features planned. Most of the new development now occurs outside React DnD—for example, there is an ongoing work on [the touch backend](https://github.com/yahoo/react-dnd-touch-backend) for it.

### Who made it and why?

React DnD was created by [Dan Abramov](http://github.com/gaearon).

Its aim is to expose a powerful API that is browser-agnostic, data-centric, works great with React and Flux, and is testable and extensible. Read [The Future of the Drag and Drop API](https://medium.com/@dan_abramov/the-future-of-drag-and-drop-apis-249dfea7a15f) for some context.

It is loosely based on the pre-React code written at Stampsy by [Andrew Kuznetsov](https://github.com/cavinsmith). Later it received valuable contributions from [Alexander Kuznetsov](https://github.com/alexkuz) and [Nathan Hutchison](https://github.com/nelix).

React DnD would not have reached the 1.0 release without the generous donations from:

* [Macropod](https://macropod.com/), a company developing team productivity software;
* [Webflow](https://webflow.com/), a company creating a professional responsive website builder.

[Gadzhi Kharkharov](http://kkga.me/) styled the website, and the [fixed-data-table](https://github.com/facebook/fixed-data-table) project provided the website template.

### How Do I Contribute?

Contributing the documentation for the underlying [DnD Core](https://github.com/gaearon/dnd-core) library would be a huge help, as it is currently not documented at all, but its concepts leak in some advanced scenarios such as [writing tests](docs-testing.html).

Porting the library to other modern frameworks such as Cycle, Mercury, or Deku, is also appreciated. Such ports would be able to reuse DnD Core logic and the existing backends.

Please let me know via the [issue tracker](https://github.com/gaearon/react-dnd/issues) if you create advanced examples such as a Kanban board application, or write a blog post or record a screencast about React DnD, so I can link to it.

While DnD Core is fully tested, React DnD does not currently have any unit tests. Writing them is a great and eagerly desired contribution.

⚛
