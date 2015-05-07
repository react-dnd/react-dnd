React DnD adds drag and drop capabilities to your React components.

### Enrich your components

Instead of providing readymade widgets, React DnD wraps your components and injects props into them. If you use React Router or Flummox, you already know this pattern.

### Go with the flow

React DnD fully embraces the declarative rendering paradigm of React and doesn't mutate the DOM. It is a great complement to Flux and other architectures with the unidirectional data flow.

### Skip the quirks

HTML5 drag and drop has an awkward API full of pitfalls and browser inconsistencies. React DnD handles them internally for you, so you can focus on developing your application instead of chasing the bugs.

### Swap the engine

React DnD uses the HTML5 drag and drop under the hood, but it also lets you supply a custom engine. You can create a custom DnD engine based on the touch events, the mouse events, or something else entirely. For example, a built-in simulation engine lets you test drag and drop interaction of your components in a Node test environment outside the browser.

### Embrace the future

React DnD does not export mixins and works equally well with any components, whether they are created using ES6 classes, `createClass` or alternative React frameworks such as Omniscient. Its API shines with ES7 decorators if you like to be on the bleeding edge, but it also feels natural in both ES5 and ES6.

## What's It Look Like?

### Drag Source

-------------------
```js
// Let's make <Card text='Write the docs' /> draggable!

var React = require('react');
var DragDrop = require('react-dnd').DragDrop;
var PropTypes = React.PropTypes;

var ItemTypes = {
  CARD: 'card',
  LIST: 'list'
};

var CardDragSource = {
  beginDrag: function (props) {
    return {
      text: props.text
    };
  }
}

function configure(register) {
  return register.dragSource(ItemTypes.CARD, CardDragSource);
}

function collect(cardSource) {
  return {
    isDragging: cardSource.isDragging(),
    connectDragSource: cardSource.connect()
  };
}

var Card = React.createClass({
  propTypes: {
    text: PropTypes.string.isRequired,

    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  },

  render: function () {
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;
    var text = this.props.text;

    return (
      <div ref={connectDragSource}
           style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
});

module.exports = DragDrop(configure, collect)(Card);
```
-------------------
```js
// Let's make <Card text='Write the docs' /> draggable!

import React, { PropTypes } from 'react';
import { DragDrop } from 'react-dnd';

const ItemTypes = {
  CARD: 'card',
  LIST: 'list'
};

const CardDragSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};

class Card {
  render() {
    var { isDragging, connectDragSource, text } = this.props;

    return (
      <div ref={connectDragSource}
           style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
}

Card.propTypes = {
  text: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

export default DragDrop(
  register =>
    register.dragSource(ItemTypes.CARD, CardDragSource),

  cardSource => ({
    isDragging: cardSource.isDragging(),
    connectDragSource: cardSource.connect()
  })
)(Card);
```
-------------------
```js
// Let's make <Card text='Write the docs' /> draggable!

import React, { PropTypes } from 'react';
import { DragDrop } from 'react-dnd';

const ItemTypes = {
  CARD: 'card',
  LIST: 'list'
};

const CardDragSource = {
  beginDrag(props) {
    return {
      text: props.text
    };
  }
};

@DragDrop(
  register =>
    register.dragSource(ItemTypes.CARD, CardDragSource),

  cardSource => ({
    isDragging: cardSource.isDragging(),
    connectDragSource: cardSource.connect()
  })
)
export default class Card {
  static propTypes = {
    text: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  };

  render() {
    var { isDragging, connectDragSource, text } = this.props;

    return (
      <div ref={connectDragSource}
           style={{ opacity: isDragging ? 0.5 : 1 }}>
        {text}
      </div>
    );
  }
}
```
-------------------

### Drop Target

TODO