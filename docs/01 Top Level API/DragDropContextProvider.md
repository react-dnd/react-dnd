*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

DragDropContextProvider
=========================

As an alternative to the DragDropContext, you can use the DragDropContextProvider element
to set up React DnD for your application. Similar to the DragDropContext, this may be
injected with a backend via the `backend` prop, but it also can be injected with a `window` object.

### Usage

-------------------
```js
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContextProvider = require('react-dnd').DragDropContextProvider;

var YourApp = React.createClass(
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      /* ... */
      </DragDropContextProvider>
    );
  };
);

module.exports = YourApp;
```
-------------------
```js
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

export default class YourApp {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      /* ... */
      </DragDropContextProvider>
    );
  };
}

```
-------------------
```js
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

export default class YourApp {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      /* ... */
      </DragDropContextProvider>
    );
  };
}
```
-------------------

### Props

* **`backend`**: Required. A React DnD backend. Unless you're writing a custom one, you probably want to use the [HTML5 backend](docs-html5-backend.html) that ships with React DnD.
* **`window`**: Optional. The window object used for establishing subscriptions in the HTML5 Backend. This is mainly for iframe support.

### Injecting a Window Instance (optional)
In order to support iframes, we need to be able to inject the window we're subscribing for events in into the HTML5 Backend. You can do this in a couple of ways.

* Via the `window` prop. This has the highest precedent for determining the window to use.
* Via the `window` context value. This has the next higest precedent.

If neither of these arguments are present, then the global `window` variable is used.
