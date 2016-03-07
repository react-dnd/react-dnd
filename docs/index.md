React DnD is a set of React [higher-order](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) components to help you build complex drag and drop interfaces while keeping your components decoupled. It is a perfect fit for apps like Trello and Storify, where dragging transfers data between different parts of the application, and the components change their appearance and the application state in response to the drag and drop events.

## Installation

```sh
npm install --save react-dnd
npm install --save react-dnd-html5-backend
```

The second package instructs React DnD to use [the HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop) under the hood. You may choose to use a third-party backend instead, such as [the touch backend](https://github.com/yahoo/react-dnd-touch-backend).

## What's It Look Like?

-------------------
```js
// Let's make <Card text='Write the docs' /> draggable!

var React = require('react');
var DragSource = require('react-dnd').DragSource;
var ItemTypes = require('./Constants').ItemTypes;
var PropTypes = React.PropTypes;

/**
 * Implements the drag source contract.
 */
var cardSource = {
  beginDrag: function (props) {
    return {
      text: props.text
    };
  }
}

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var Card = React.createClass({
  propTypes: {
    text: PropTypes.string.isRequired,

    // Injected by React DnD:
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  },

  render: function () {
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;
    var text = this.props.text;

    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
});

// Export the wrapped component:
module.exports = DragSource(ItemTypes.CARD, cardSource, collect)(Card);
```
-------------------
```js
// Let's make <Card text='Write the docs' /> draggable!

import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  text: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

class Card {
  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
}

Card.propTypes = propTypes;

// Export the wrapped component:
export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
```
-------------------
```js
// Let's make <Card text='Write the docs' /> draggable!

import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';

/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};

@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Card {
  static propTypes = {
    text: PropTypes.string.isRequired,

    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
}
```
-------------------

## Features

### It works with your components

Instead of providing readymade widgets, React DnD wraps your components and injects props into them. If you use React Router or Flummox, you already know this pattern.

### It embraces unidirectional data flow

React DnD fully embraces the declarative rendering paradigm of React and doesn't mutate the DOM. It is a great complement to Flux and other architectures with the unidirectional data flow. In fact it is built on Flux.

### It hides the platform quirks

HTML5 drag and drop has an awkward API full of pitfalls and browser inconsistencies. React DnD handles them internally for you, so you can focus on developing your application instead of working around the browser bugs.

### It is extensible and testable

React DnD uses the HTML5 drag and drop under the hood, but it also lets you supply a custom “backend”. You can create a custom DnD backend based on the touch events, the mouse events, or something else entirely. For example, a built-in simulation backend lets you test drag and drop interaction of your components in a Node environment.

### It is ready for the future

React DnD does not export mixins, and works equally great with any components, whether they are created using ES6 classes, `createClass` or alternative React frameworks such as Omniscient. Its API shines with ES7 decorators if you like to be on the bleeding edge, but it also feels natural in both ES5 and ES6.

## Touch Support

For touch support, use React DnD with [the touch backend](https://github.com/yahoo/react-dnd-touch-backend) instead of the HTML5 backend.

## Non-Goals

React DnD gives you a set of powerful primitives, but it does not contain any readymade components. It's lower level than [jQuery UI](https://jqueryui.com/) or [interact.js](http://interactjs.io/) and is focused on getting the drag and drop interaction right, leaving its visual aspects such as axis constraints or snapping to you. For example, React DnD doesn't plan to provide a `Sortable` component. Instead it makes it easy for you to build your own, with any rendering customizations that you need.

## Support and Contributions

Issues and potential improvements are discussed on [Github](https://github.com/gaearon/react-dnd/issues).  
The [Gitter room](https://gitter.im/gaearon/react-dnd) is another good place to get support.

## Thanks

Big thanks to [BrowserStack](https://www.browserstack.com) for letting the maintainers use their service to debug browser issues.

## License

React DnD is licensed as MIT. Use it as you will.
