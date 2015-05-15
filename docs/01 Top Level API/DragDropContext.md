*New to React DnD? [Read the overview](/docs-overview.html) before jumping into the docs.*

DragDropContext
=========================

Wrap the root component of your application with `DragDropContext` to set up React DnD.  
This lets you specify the backend, and sets up the shared DnD state behind the scenes.

### Usage

-------------------
```js
var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var DragDropContext = require('react-dnd').DragDropContext;

var YourApp = React.createClass(
  /* ... */
);

module.exports = DragDropContext(HTML5Backend)(YourApp);
```
-------------------
```js
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext } from 'react-dnd';

class YourApp {
  /* ... */
}

export default DragDropContext(HTML5Backend)(YourApp);
```
-------------------
```js
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext } from 'react-dnd';

@DragDropContext(HTML5Backend)
export default class YourApp {
  /* ... */
}
```
-------------------

### Parameters

* **`backend`**: Required. A React DnD backend. Unless you're writing a custom one, you probably want to use the [HTML5 backend](/api-html5.html) that ships with React DnD.
