_New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs._

# DragDropContext

Wrap the root component of your application with `DragDropContext` to set up React DnD.  
This lets you specify the backend, and sets up the shared DnD state behind the scenes.

### Usage

---

```js
var createReactClass = require('create-react-class')
var HTML5Backend = require('react-dnd-html5-backend')
var DragDropContext = require('react-dnd').DragDropContext

var YourApp = createReactClass()
/* ... */

module.exports = DragDropContext(HTML5Backend)(YourApp)
```

---

```js
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class YourApp {
	/* ... */
}

export default DragDropContext(HTML5Backend)(YourApp)
```

---

```js
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

@DragDropContext(HTML5Backend, /* optional */ { window })
export default class YourApp {
	/* ... */
}
```

---

### Parameters

* **`backend`**: Required. A React DnD backend. Unless you're writing a custom one, you probably want to use the [HTML5 backend](docs-html5-backend.html) that ships with React DnD.

* **`context`**: Backend-dependent. A context object used to customize the backend. For example the HTML5Backend may inject a custom window object for iframe scenarios.

### Return Value

`DragDropContext` wraps your component and returns another React component.  
For easier [testing](docs-testing.html), it provides an API to reach into the internals:

#### Static Properties

* **`DecoratedComponent`**: Returns the wrapped component type.

#### Instance Methods

* **`getDecoratedComponentInstance()`**: Returns the wrapped component instance.

* **`getManager()`**: Returns the internal manager that provides access to the underlying backend. This part is currently not documented, but you can refer to the [testing](docs-testing.html) tutorial for a usage example.
