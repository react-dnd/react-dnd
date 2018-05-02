_New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs._

# DragDropContextProvider

As an alternative to the DragDropContext, you can use the DragDropContextProvider element
to set up React DnD for your application. Similar to the DragDropContext, this may be
injected with a backend via the `backend` prop, but it also can be injected with a `window` object.

### Usage

---

```js
var createReactClass = require('create-react-class');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContextProvider = require('react-dnd').DragDropContextProvider;

var YourApp = createReactClass(
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

---

```js
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'

export default class YourApp {
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				/* ... */
			</DragDropContextProvider>
		)
	}
}
```

---

```js
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'

export default class YourApp {
	render() {
		return (
			<DragDropContextProvider backend={HTML5Backend}>
				/* ... */
			</DragDropContextProvider>
		)
	}
}
```

---

### Props

* **`backend`**: Required. A React DnD backend. Unless you're writing a custom one, you probably want to use the [HTML5 backend](docs-html5-backend.html) that ships with React DnD.
* **`context`**: Optional. The backend context used to configure the backend. This is dependent on the backend implementation.
