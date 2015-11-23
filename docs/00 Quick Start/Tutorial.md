Tutorial
===================

Now that you've read [the overview](docs-overview.html), it's the adventure time! Even if you have not, you can skip it for now, because ⅔ of our time we'll be busy identifying and building normal React components, just like in the classic [Thinking in React](https://facebook.github.io/react/blog/2013/11/05/thinking-in-react.html) tutorial. Adding the drag and drop support is just the icing on the cake.

In this tutorial, we're going to build a Chess game with React and React DnD. Just kidding! Writing a full-blown Chess game is totally out of scope of this tutorial. **What we're going to build is a tiny app with a Chess board and a lonely Knight. The Knight will be draggable according to the Chess rules.**

We will use this example to demonstrate the data-driven approach of React DnD. You will learn how to create a drag source and a drop target, wire them together with your components, and change their appearance in response to the drag and drop events.

If you're new to React and know a thing or two about it, but yet have to gain some experience building components, this tutorial can also serve as an introduction to the React mode of thinking and the React workflow. **If you are a seasoned React developer and only came here for the drag and drop part, feel free to skip to the third and the final chapter of this tutorial.**

Enough talk! It's time to set up a build workflow for our little project. I use [Webpack](http://webpack.github.io/), you might be using [Browserify](http://browserify.org/). I don't want to get into that now, so just set up an empty React project in whatever way is most convenient for you. If you're feeling lazy, you are free to clone [React Hot Boilerplate](https://github.com/gaearon/react-hot-boilerplate) and work on top of it. In fact, that's what I'm going to do myself.

In this tutorial, the code examples are available simultaneously in ES5, ES6, and [ES7](docs-faq.html). If you want to follow along using ES6 or ES7, you will need to set up a compilation step using [Babel](https://babeljs.io/). It's easy to [make it work with the tool of your choice](https://babeljs.io/docs/using-babel/) so we're going to skip this step, too, and assume you've dealt with it and you are ready to write code now. The boilerplate project [I linked to before](https://github.com/gaearon/react-hot-boilerplate) already includes Babel.

The app we're going to build is [available as an example on this website](examples-chessboard-tutorial-app.html).

## Identifying the Components

We're going to start by creating some React components first, with no thoughts of the drag and drop interaction. Which components is our Lonely Knight app going to be made of? I can think of a few:

* `Knight`, our lonely knight piece;
* `Square`, a single square on the board;
* `Board`, the whole board with 64 squares.

Let's consider their props.

* `Knight` probably needs no props. It has a position, but there's no reason for the `Knight` to know it, because it can be positioned by being placed into a `Square` as a child.

* It is tempting to give `Square` its position via props, but this, again, is not necessary, because the only information it really needs for the rendering is the color. I'm going to make `Square` white by default, and add a `black` boolean prop. And of course `Square` may accept a single child: the chess piece that is currently on it. I chose white as the default background color to match the browser defaults.

* The `Board` is tricky. It makes no sense to pass `Square`s as children to it, because what else could a board contain? Therefore it probably owns the `Square`s. But then, it also need to own the `Knight` because this guy needs to be placed inside one of those `Square`s. This means that the `Board` needs to know the knight's current position. In a real Chess game, the `Board` would accept a data structure describing all the pieces, their colors and positions, but for us, a `knightPosition` prop will suffice. We will use two-item arrays as coordinates, with `[0, 0]` referring to the A8 square. Why A8 instead of A1? To match the browser coordinate orientation. I tried it another way and it just messed with my head too much.

Where will the current state live? I really don't want to put it into the `Board` component. It's a good idea to have as little state in your components as possible, and because the `Board` will already have some layout logic, I don't want to also burden it with managing the state.

The good news is, it doesn't matter at this point. We're just going to write the components as if the state existed *somewhere*, and make sure that they render correctly when they receive it via props, and think about managing the state afterwards!

## Creating the Components

I prefer to start bottom-up, because this way I'm always working with something that already exists. If I were to build the `Board` first, I wouldn't see my results until I'm done with the `Square`. On the other hand, I can build and see the `Square` right away without even thinking of the `Board`. I think that the immediate feedback loop is important (you can tell that by [another project I work on](https://gaearon.github.io/react-hot-loader)).

In fact I'm going to start with the `Knight`. It doesn't have any props at all, and it the easiest one to build:

-------------------
```js
var React = require('react');

var Knight = React.createClass({
  render: function () {
    return <span>♘</span>;
  }
});

module.exports = Knight;
```
-------------------
```js
import React, { Component } from 'react';

export default class Knight extends Component {
  render() {
    return <span>♘</span>;
  }
}
```
-------------------

-------------------

Yes, ♘ is the Unicode knight! It's gorgeous. We could've made its color a prop, but in our example we're not going to have any black knights, so there is no need for that.

It seems to render fine, but just to be sure, I immediately changed my entry point to test it:

-------------------
```js
var React = require('react');
var ReactDOM = require('react-dom');
var Knight = require('./Knight');

ReactDOM.render(<Knight />, document.getElementById('root'));
```
-------------------
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Knight from './Knight';

ReactDOM.render(<Knight />, document.getElementById('root'));
```
-------------------

-------------------

<img src='http://i.imgur.com/NktjTMn.png' width='512' height='384' alt='Screenshot'>

I'm going to do this every time I work on another component, so that I always have something to render. In a larger app, I would use a component playground like [cosmos](https://github.com/skidding/cosmos) so I'd never write the components in the dark.

I see my `Knight` on the screen! Time to go ahead and implement the `Square` now. Here is my first stab:

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;

var Square = React.createClass({
  propTypes: {
    black: PropTypes.bool
  },

  render: function () {
    var black = this.props.black;
    var fill = black ? 'black' : 'white';

    return <div style={{ backgroundColor: fill }} />;
  }
});

module.exports = Square;
```
-------------------
```js
import React, { Component, PropTypes } from 'react';

export default class Square extends Component {
  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';

    return <div style={{ backgroundColor: fill }} />;
  }
}

Square.propTypes = {
  black: PropTypes.bool
};
```
-------------------
```js
import React, { Component, PropTypes } from 'react';

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';

    return <div style={{ backgroundColor: fill }} />;
  }
}
```
-------------------

Now I change the entry point code to see how the `Knight` looks inside a `Square`:

-------------------
```js
var React = require('react');
var ReactDOM = require('react-dom');
var Knight = require('./Knight');
var Square = require('./Square');

ReactDOM.render(
  <Square black>
    <Knight />
  </Square>,
  document.getElementById('root')
);
```
-------------------
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Knight from './Knight';
import Square from './Square';

ReactDOM.render(
  <Square black>
    <Knight />
  </Square>,
  document.getElementById('root')
);
```
-------------------

-------------------

Sadly, the screen is empty. I made a few mistakes:

* I forgot to give `Square` any dimensions so it just collapses. I don't want it to have any fixed size, so I'll give it `width: '100%'` and `height: '100%'` to fill the container.

* I forgot to put `{this.props.children}` inside the `div` returned by the `Square`, so it ignores the `Knight` passed to it.

Even after correcting these two mistakes, I still can't see my `Knight` when the `Square` is `black`. That's because the default page body text color is black, so it is not visible on the black `Square`. I could have fixed this by giving `Knight` a color prop, but a much simpler fix is to set a corresponding `color` style in the same place where I set `backgroundColor`. This version of `Square` corrects the mistakes and works equally great with both colors:

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;

var Square = React.createClass({
  propTypes: {
    black: PropTypes.bool
  },

  render: function () {
    var black = this.props.black;
    var fill = black ? 'black' : 'white';
    var stroke = black ? 'white' : 'black';

    return (
      <div style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = Square;
```
-------------------
```js
import React, { Component, PropTypes } from 'react';

export default class Square extends Component {
  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return (
      <div style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
}

Square.propTypes = {
  black: PropTypes.bool
};
```
-------------------
```js
import React, { Component, PropTypes } from 'react';

export default class Square extends Component {
  static propTypes = {
    black: PropTypes.bool
  };

  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';

    return (
      <div style={{
        backgroundColor: fill,
        color: stroke,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
}
```
-------------------

<img src='http://i.imgur.com/jvgv6DV.png' width='512' height='384' alt='Screenshot'>

Finally, time to get started with the `Board`! I'm going to start with an extremely naïve version that just draws the same single square:

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;
var Square = require('./Square');
var Knight = require('./Knight');

var Board = React.createClass({
  propTypes: {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  },

  render: function () {
    return (
      <div>
        <Square black>
          <Knight />
        </Square>
      </div>
    );
  }
});

module.exports = Board;
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';

export default class Board extends Component {
  render() {
    return (
      <div>
        <Square black>
          <Knight />
        </Square>
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';

export default class Board extends Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  render() {
    return (
      <div>
        <Square black>
          <Knight />
        </Square>
      </div>
    );
  }
}
```
-------------------

My only intention so far is to make it render, so that I can start tweaking it:

-------------------
```js
var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board');

ReactDOM.render(
  <Board knightPosition={[0, 0]} />,
  document.getElementById('root')
);
```
-------------------
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

ReactDOM.render(
  <Board knightPosition={[0, 0]} />,
  document.getElementById('root')
);
```
-------------------

-------------------

Indeed, I can see the same single square. I'm now going to add a whole bunch of them! But I don't know where to start. What do I put in `render`? Some kind of a `for` loop? A `map` over some array?

To be honest, I don't want to think about it now. I already know how to render a single square with or without a knight. I also know the knight's position thanks to the `knightPosition` prop. This means I can write the `renderSquare` method and not worry about rendering the whole board just yet.

My first attempt at `renderSquare` looks like this:

-------------------
```js
renderSquare: function (x, y) {
  var black = (x + y) % 2 === 1;

  var knightX = this.props.knightPosition[0];
  var knightY = this.props.knightPosition[1];
  var piece = (x === knightX && y === knightY) ?
    <Knight /> :
    null;

  return (
    <Square black={black}>
      {piece}
    </Square>
  );
}
```
-------------------
```js
renderSquare(x, y) {
  const black = (x + y) % 2 === 1;

  const [knightX, knightY] = this.props.knightPosition;
  const piece = (x === knightX && y === knightY) ?
    <Knight /> :
    null;

  return (
    <Square black={black}>
      {piece}
    </Square>
  );
}
```
-------------------

-------------------

I can already give it a whirl by changing `render` to be

-------------------
```js
render: function () {
  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      {this.renderSquare(0, 0)}
      {this.renderSquare(1, 0)}
      {this.renderSquare(2, 0)}
    </div>
  );
}
```
-------------------
```js
render() {
  return (
    <div style={{
      width: '100%',
      height: '100%'
    }}>
      {this.renderSquare(0, 0)}
      {this.renderSquare(1, 0)}
      {this.renderSquare(2, 0)}
    </div>
  );
}
```
-------------------

-------------------

<img src='http://i.imgur.com/Br30DLg.png' width='512' height='384' alt='Screenshot'>

At this point, I realize that I forgot to give my squares any layout. I'm going to try [Flexbox](https://developer.mozilla.org/en/CSS/Using_CSS_flexible_boxes) because why not. I added some styles to the root `div`, and also wrapped the `Square`s into `div`s so I could lay them out. Generally it's a good idea to keep components encapsulated and ignorant of how they're being laid out, even if this means adding wrapper `div`s.

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;
var Square = require('./Square');
var Knight = require('./Knight');

var Board = React.createClass({
  propTypes: {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  },

  renderSquare: function (i) {
    var x = i % 8;
    var y = Math.floor(i / 8);
    var black = (x + y) % 2 === 1;

    var knightX = this.props.knightPosition[0];
    var knightY = this.props.knightPosition[1];
    var piece = (x === knightX && y === knightY) ?
      <Knight /> :
      null;

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  },

  render: function () {
    var squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
});

module.exports = Board;
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';

export default class Board extends Component {
  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.props.knightPosition;
    const piece = (x === knightX && y === knightY) ?
      <Knight /> :
      null;

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';

export default class Board extends Component {
  static propTypes = {
    knightPosition: PropTypes.arrayOf(
      PropTypes.number.isRequired
    ).isRequired
  };

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const black = (x + y) % 2 === 1;

    const [knightX, knightY] = this.props.knightPosition;
    const piece = (x === knightX && y === knightY) ?
      <Knight /> :
      null;

    return (
      <div key={i}
           style={{ width: '12.5%', height: '12.5%' }}>
        <Square black={black}>
          {piece}
        </Square>
      </div>
    );
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}
```
-------------------

<img src='http://i.imgur.com/RsQDI4Y.png' width='512' height='384' alt='Screenshot'>

It looks pretty awesome! I don't know how to constrain the `Board` to maintain a square aspect ratio, but this should be easy to add later.

Think about it for a moment. We just went from nothing to being able to move the `Knight` on a beautiful `Board` by changing the `knightPosition`:

-------------------
```js
var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board');

ReactDOM.render(
  <Board knightPosition={[4, 7]} />,
  document.getElementById('root')
);
```
-------------------
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

ReactDOM.render(
  <Board knightPosition={[4, 7]} />,
  document.getElementById('root')
);
```
-------------------

-------------------

<img src='http://i.imgur.com/0fNBn5a.png' width='512' height='384' alt='Screenshot'>

Declarative much? That's why people love working with React.

## Adding the State

We want to make the `Knight` draggable. It's a noble goal, but we need to see past it. What we really mean is that we want to keep the current `knightPosition` in some kind of state storage, and have some way to change it.

Because setting up this state requires some thought, we won't try to implement dragging at the same time. Instead, we'll start with a simpler implementation. We will move the `Knight` when you click a particular `Square`, but only if this is allowed by the Chess rules. Implementing this logic should give us enough insight into managing the state, so we can replace clicking with the drag and drop once we've dealt with that.

React is not opinionated about the state management or the data flow; you can use [Flux](https://facebook.github.io/flux/), [Rx](https://github.com/Reactive-Extensions/RxJS) or <s>even Backbone</s> nah, [avoid fat models and separate your reads from writes](http://martinfowler.com/bliki/CQRS.html).

I don't want to bother with installing or setting up Flux for this simple example, so I'm going to follow a simpler pattern. It won't scale as well as Flux, but I also don't need it to. I have not decided on the API for my state manager yet, but I'm going to call it `Game`, and it will definitely need to have some way of signaling data changes to my React code.

Since I know this much, I can rewrite my `index.js` with a hypothetical `Game` that doesn't exist yet. Note that this time, I'm writing my code in blind, not being able to run it yet. This is because I'm still figuring out the API:

-------------------
```js
var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board');
var observe = require('./Game').observe;

var rootEl = document.getElementById('root');

observe(function (knightPosition) {
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    rootEl
  );
});
```
-------------------
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';
import { observe } from './Game';

const rootEl = document.getElementById('root');

observe(knightPosition =>
  ReactDOM.render(
    <Board knightPosition={knightPosition} />,
    rootEl
  )
);
```
-------------------

-------------------

What is this `observe` function I import? It's just the most minimal way I can think of to subscribe to a changing state. I could've made it an `EventEmitter` but why on Earth even *go there* when all I need is a single change event? I could have made `Game` an object model, but why do that, when all I need is a stream of values?

Just to verify that this subscription API makes some sense, I'm going to write a fake `Game` that emits random positions:

-------------------
```js
exports.observe = function (receive) {
  setInterval(function () {
    receive([
      Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 8)
    ]);
  }, 500);
};
```
-------------------
```js
export function observe(receive) {
  setInterval(() => receive([
    Math.floor(Math.random() * 8),
    Math.floor(Math.random() * 8)
  ]), 500);
}
```
-------------------

-------------------

Nothing feels as good as being back into the rendering game!

<img src='https://s3.amazonaws.com/f.cl.ly/items/1K0s0n0r0C0e2P2N2D1d/Screen%20Recording%202015-05-15%20at%2012.06%20pm.gif' width='404' height='445' alt='Screenshot'>

This is obviously not very useful. If we want some interactivity, we're going to need a way to modify the `Game` state from our components. For now, I'm going to keep it simple and expose a `moveKnight` function that directly modifies the internal state. This is not going to fare well in a moderately complex app where different state storages may be interested in updating their state in response to a single user action, but in our case this will suffice:

-------------------
```js
var knightPosition = [0, 0];
var observer = null;

function emitChange() {
  observer(knightPosition);
}

exports.observe = function (o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

exports.moveKnight = function (toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}
```
-------------------
```js
let knightPosition = [0, 0];
let observer = null;

function emitChange() {
  observer(knightPosition);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function moveKnight(toX, toY) {
  knightPosition = [toX, toY];
  emitChange();
}
```
-------------------

-------------------


Now, let's go back to our components. Our goal at this point is to move the `Knight` to a `Square` that was clicked. One way to do that is to call `moveKnight` from the `Square` itself. However, this would require us to pass the `Square` its position. Here is a good rule of thumb:

>If a component doesn't need some data for rendering, it doesn't need that data at all.

The `Square` does not need to know its position to render. Therefore, it's best to avoid coupling it to the `moveKnight` method at this point. Instead, we are going to add an `onClick` handler to the `div` that wraps the `Square` inside the `Board`:

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;
var Square = require('./Square');
var Knight = require('./Knight');
var moveKnight = require('./Game').moveKnight;

/* ... */

renderSquare: function (i) {
  var x = i % 8;
  var y = Math.floor(i / 8);
  var black = (x + y) % 2 === 1;

  var knightX = this.props.knightPosition[0];
  var knightY = this.props.knightPosition[1];
  var piece = (x === knightX && y === knightY) ?
    <Knight /> :
    null;

  return (
    <div key={i}
         style={{ width: '12.5%', height: '12.5%' }}
         onClick={this.handleSquareClick.bind(this, x, y)}>
      <Square black={black}>
        {piece}
      </Square>
    </div>
  );
},

handleSquareClick: function (toX, toY) {
  moveKnight(toX, toY);
}
```
-------------------
```js
import React, { PropTypes } from 'react';
import Square from './Square';
import Knight from './Knight';
import { moveKnight } from './Game';

/* ... */

renderSquare(i) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  const black = (x + y) % 2 === 1;

  const [knightX, knightY] = this.props.knightPosition;
  const piece = (x === knightX && y === knightY) ?
    <Knight /> :
    null;

  return (
    <div key={i}
         style={{ width: '12.5%', height: '12.5%' }}
         onClick={() => this.handleSquareClick(x, y)}>
      <Square black={black}>
        {piece}
      </Square>
    </div>
  );
}

handleSquareClick(toX, toY) {
  moveKnight(toX, toY);
}
```
-------------------

-------------------


We could have also added an `onClick` prop to `Square` and used it instead, but since we're going to remove the click handler in favor of the drag and drop interface later anyway, why bother.

The last missing piece right now is the Chess rule check. The `Knight` can't just move to an arbitrary square, it is only allowed to make [L-shaped moves](http://en.wikipedia.org/wiki/Knight_%28chess%29#Movement). I'm adding a `canMoveKnight(toX, toY)` function to the `Game` and changing the initial position to A2 to match the Chess rules:

-------------------
```js
var knightPosition = [1, 7];

/* ... */

exports.canMoveKnight = function (toX, toY) {
  const x = knightPosition[0];
  const y = knightPosition[1];
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
         (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}
```
-------------------
```js
let knightPosition = [1, 7];

/* ... */

export function canMoveKnight(toX, toY) {
  const [x, y] = knightPosition;
  const dx = toX - x;
  const dy = toY - y;

  return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
         (Math.abs(dx) === 1 && Math.abs(dy) === 2);
}
```

-------------------

-------------------


Finally, I'm adding a `canMoveKnight` check to the `handleSquareClick` method:

-------------------
```js
var canMoveKnight = require('./Game').canMoveKnight;
var moveKnight = require('./Game').moveKnight;

/* ... */

handleSquareClick: function (toX, toY) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}
```
-------------------
```js
import { canMoveKnight, moveKnight } from './Game';

/* ... */

handleSquareClick(toX, toY) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}
```
-------------------

-------------------

<img src='https://s3.amazonaws.com/f.cl.ly/items/1F371u301l1H2X3o0g1h/Screen%20Recording%202015-05-15%20at%2012.08%20pm.gif' width='404' height='445' alt='Screenshot'>

Working great so far!

## Adding the Drag and Drop Interaction

This is the part that actually prompted me to write this tutorial. We are now going to see how easy React DnD makes it to add some drag and drop interaction to your existing components.

This part assumes you are at least somewhat familiar with the concepts presented in the [overview](docs-overview.html), such as the backends, the collecting functions, the types, the items, the drag sources, and the drop targets. If you didn't understand everything, it's fine, but make sure you at least give it a chance before jumping into the coding process.

We're going to start by installing React DnD and the HTML5 backend for it:

```
npm install --save react-dnd react-dnd-html5-backend
```

In the future, you might want to explore alternative third-party backends, such as the [touch backend](https://github.com/yahoo/react-dnd-touch-backend), but this is out of scope of this tutorial.

The first thing we need to set up in our app is the [`DragDropContext`](docs-drag-drop-context.html). We need it to specify that we're going to use the [`HTML5` backend](docs-html5-backend.html) in our app.

Because the `Board` is the top-level component in our app, I'm going to put the [`DragDropContext`](docs-drag-drop-context.html) on it:

-------------------
```js
var React = require('react');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');

var Board = React.createClass({
  /* ... */
});

module.exports = DragDropContext(HTML5Backend)(Board);
```
-------------------
```js
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
  /* ... */
}

export default DragDropContext(HTML5Backend)(Board);
```
-------------------
```js
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class Board extends Component {
  /* ... */
}
```
-------------------


Next, I'm going to create the constants for the draggable item types. We're only going to have a single item type in our game, a `KNIGHT`. I'm creating a `Constants` module that exports it:

-------------------
```js
exports.ItemTypes = {
  KNIGHT: 'knight'
};
```
-------------------
```js
export const ItemTypes = {
  KNIGHT: 'knight'
};
```
-------------------

-------------------

The preparation work is done now. Let's make the `Knight` draggable!

The [`DragSource`](docs-drag-source.html) higher-order component accepts three parameters: `type`, `spec`, and `collect`. Our `type` is the constant we just defined, so now we need to write a drag source specification and a collecting function. For the `Knight`, the drag source specification is going to be ridiculously simple:

-------------------
```js
var knightSource = {
  beginDrag: function (props) {
    return {};
  }
};
```
-------------------
```js
const knightSource = {
  beginDrag(props) {
    return {};
  }
};
```
-------------------

-------------------

This is because there is nothing to describe: there is literally a single draggable object in the whole application! If we had a bunch of chess pieces, it might be a good idea to use the `props` parameter and return something like `{ pieceId: props.id }`. In our case, an empty object will suffice.

Next, we're going to write a collecting function. What props does the `Knight` need? It will sure need a way to specify the drag source node. It would also be nice to slightly dim the `Knight`'s opacity while it is being dragged. Therefore, it needs to know whether it is currently being dragged.

Here is the collecting function I wrote for it:

```js
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}
```

Let's take a look at the whole `Knight` component now, including the `DragSource` call and the updated `render` function:

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./Constants').ItemTypes;
var DragSource = require('react-dnd').DragSource;

var knightSource = {
  beginDrag: function (props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

var Knight = React.createClass({
  propTypes: {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  },

  render: function () {
    var connectDragSource = this.props.connectDragSource;
    var isDragging = this.props.isDragging;

    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </div>
    );
  }
});

module.exports = DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Knight extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </div>
    );
  }
}

Knight.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';

const knightSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(ItemTypes.KNIGHT, knightSource, collect)
export default class Knight extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}>
        ♘
      </div>
    );
  }
}
```
-------------------

<img src='https://s3.amazonaws.com/f.cl.ly/items/3L1d0C203C0s1r1H2H0m/Screen%20Recording%202015-05-15%20at%2001.11%20pm.gif' width='404' height='445' alt='Screenshot'>

The `Knight` is now a drag source, but there are no drop targets to handle the drop yet. We're going to make the `Square` a drop target now.

This time, we can't avoid passing the position to the `Square`. After all, how can the `Square` know where to move the dragged knight if the `Square` doesn't know its own position? On the other hand, it still feels wrong because the `Square` as an entity in our application has not changed, and if it used to be simple, why complicate it? When you face this dilemma, it's time to separate the [smart and dumb components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

I'm going to introduce a new component called the `BoardSquare`. It renders the good old `Square`, but is also aware of its position. In fact, it's encapsulating some of the logic that the `renderSquare` method inside the `Board` used to do. React components are often extracted from such render submethods when the time is right.

Here is the `BoardSquare` I extracted:

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;
var Square = require('./Square');

var BoardSquare = React.createClass({
  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  },

  render: function () {
    var x = this.props.x;
    var y = this.props.y;
    var black = (x + y) % 2 === 1;

    return (
      <Square black={black}>
        {this.props.children}
      </Square>
    );
  }
});

module.exports = BoardSquare;
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';

export default class BoardSquare extends Component {
  render() {
    const { x, y } = this.props;
    const black = (x + y) % 2 === 1;

    return (
      <Square black={black}>
        {this.props.children}
      </Square>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';

export default class BoardSquare extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  render() {
    const { x, y } = this.props;
    const black = (x + y) % 2 === 1;

    return (
      <Square black={black}>
        {this.props.children}
      </Square>
    );
  }
}
```
-------------------

I also changed the `Board` to use it:

-------------------
```js
renderSquare: function (i) {
  var x = i % 8;
  var y = Math.floor(i / 8);

  return (
    <div key={i}
         style={{ width: '12.5%', height: '12.5%' }}>
      <BoardSquare x={x}
                   y={y}>
        {this.renderPiece(x, y)}
      </BoardSquare>
    </div>
  );
}

renderPiece: function (x, y) {
  var knightX = this.props.knightPosition[0]
  var knightY = this.props.knightPosition[1];

  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}
```
-------------------
```js
renderSquare(i) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  return (
    <div key={i}
         style={{ width: '12.5%', height: '12.5%' }}>
      <BoardSquare x={x}
                   y={y}>
        {this.renderPiece(x, y)}
      </BoardSquare>
    </div>
  );
}

renderPiece(x, y) {
  const [knightX, knightY] = this.props.knightPosition;
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}
```
-------------------

-------------------

Let's now wrap the `BoardSquare` with a [`DropTarget`](docs-drop-target.html). I'm going to write a drop target specification that only handles the `drop` event:

-------------------
```js
var squareTarget = {
  drop: function (props, monitor) {
    moveKnight(props.x, props.y);
  }
};
```
-------------------
```js
const squareTarget = {
  drop(props, monitor) {
    moveKnight(props.x, props.y);
  }
};
```
-------------------

-------------------

See? The `drop` method receives the `props` of the `BoardSquare` so it knows *where* to move the knight when it drops. In a real app, I might also use `monitor.getItem()` to retrieve *the dragged item* that the drag source returned from `beginDrag`, but since we only have a single draggable thing in the whole application, I don't need it.

In my collecting function, I'm going to obtain the function to connect my drop target node, and I'm also going to ask the monitor whether the pointer is currently over the `BoardSquare` so I can highlight it:

```js
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}
```

After changing the `render` function to connect the drop target and show the highlight overlay, here is what `BoardSquare` came to be:

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;
var Square = require('./Square');
var canMoveKnight = require('./Game').canMoveKnight;
var moveKnight = require('./Game').moveKnight;
var ItemTypes = require('./Constants').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;

var squareTarget = {
  drop: function (props) {
    moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var BoardSquare = React.createClass({
  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired
  },

  render: function () {
    var x = this.props.x;
    var y = this.props.y;
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;
    var black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
});

module.exports = DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props) {
    moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class BoardSquare extends Component {
  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  drop(props) {
    moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@DropTarget(ItemTypes.KNIGHT, squareTarget, collect)
export default class BoardSquare extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired
  };

  render() {
    const { x, y, connectDropTarget, isOver } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
}
```
-------------------

<img src='https://s3.amazonaws.com/f.cl.ly/items/2U43301g421U3I2X2p0P/Screen%20Recording%202015-05-15%20at%2001.55%20pm.gif' width='404' height='445' alt='Screenshot'>

This is starting to look good! There is just one change left to complete this tutorial. We want to highlight the `BoardSquare`s that represent the valid moves, and only process the drop if it happened over one of those valid `BoardSquare`s.

Thankfully, it is really easy to do with React DnD. I just need to define a `canDrop` method in my drop target specification:

-------------------
```js
canDrop: function (props) {
  return canMoveKnight(props.x, props.y);
}
```
-------------------
```js
canDrop(props) {
  return canMoveKnight(props.x, props.y);
}
```
-------------------

-------------------


I'm also adding `monitor.canDrop()` to my collecting function, as well as some overlay rendering code to the component:

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;
var Square = require('./Square');
var canMoveKnight = require('./Game').canMoveKnight;
var moveKnight = require('./Game').moveKnight;
var ItemTypes = require('./Constants').ItemTypes;
var DropTarget = require('react-dnd').DropTarget;

var squareTarget = {
  canDrop: function (props) {
    return canMoveKnight(props.x, props.y);
  },

  drop: function (props) {
    moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

var BoardSquare = React.createClass({
  propTypes: {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  },

  renderOverlay: function (color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  },

  render: function () {
    var x = this.props.x;
    var y = this.props.y;
    var connectDropTarget = this.props.connectDropTarget;
    var isOver = this.props.isOver;
    var black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

module.exports = DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.x, props.y);
  },

  drop(props) {
    moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class BoardSquare extends Component {
  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{ position: 'relative' }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

BoardSquare.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
};

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
```
-------------------
```js
import React, { Component, PropTypes } from 'react';
import Square from './Square';
import { canMoveKnight, moveKnight } from './Game';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  canDrop(props) {
    return canMoveKnight(props.x, props.y);
  },

  drop(props) {
    moveKnight(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

@DropTarget(ItemTypes.KNIGHT, squareTarget, collect)
export default class BoardSquare extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
  };

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { x, y, connectDropTarget, isOver, canDrop } = this.props;
    const black = (x + y) % 2 === 1;

    return connectDropTarget(
      <div style={{ position: 'relative' }}>
        <Square black={black}>
          {this.props.children}
        </Square>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}
```
-------------------

<img src='https://s3.amazonaws.com/f.cl.ly/items/0X3c342g0i3u100p1o18/Screen%20Recording%202015-05-15%20at%2002.05%20pm.gif' width='404' height='445' alt='Screenshot'>

### Final Touches

This tutorial guided you through creating the React components, making the design decisions about them and the app's data layer, and finally adding the drag and drop interaction. My intention was to show you that React DnD fits great with the philosophy of React, and that you should think about the app architecture first before diving into implementing the complex interactions.

The last thing I want to demonstrate is drag preview customization. Sure, the browser will screenshot the DOM node, but what if we want to show something different?

We are lucky again, because it is easy to do with React DnD. We just need to add a `connect.dragPreview()` to the collecting function of the `Knight`:

```js
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}
```

This lets us use `connectDragPreview` in `render` method, just like we used `connectDragSource`, or even in `componentDidMount` with a custom image:

-------------------
```js
componentDidMount: function () {
  var connectDragPreview = this.props.connectDragPreview;
  var img = new Image();
  img.src = 'data:image/png;base64,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';
  img.onload = function () {
    connectDragPreview(img);
  };
},
```
-------------------
```js
componentDidMount() {
  const img = new Image();
  img.src = 'data:image/png;base64,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';
  img.onload = () => this.props.connectDragPreview(img);
}
```
-------------------

-------------------

Happy dragging and dropping.

<img src='https://s3.amazonaws.com/f.cl.ly/items/1F2g2F0D470X0d0k2A1U/Screen%20Recording%202015-05-15%20at%2002.22%20pm.gif' width='404' height='445' alt='Screenshot'>

Now go and [play with it](examples-chessboard-tutorial-app.html)!
