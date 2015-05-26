*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

HTML5
===================

This is the only backend currently shipping with React DnD. It uses [the HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_and_drop) under the hood and hides [its quirks](http://quirksmode.org/blog/archives/2009/09/the_html5_drag.html).

### Importing

* In the UMD build it is available as `ReactDnD.HTML5`;
* In the CommonJS build, you can import it from `react-dnd/modules/backends/HTML5`.

It is not a top-level export by purpose so that you don't need to include it if you use a custom backend.

### Extras

Aside from the default export, `HTML5` module also provides a few extras:

* **`getEmptyImage()`**: a function returning a transparent empty [`Image`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image). Use `connect.dragPreview()` of the [DragSourceConnector](docs-drag-source-connector.html) to hide the browser-drawn drag preview completely. Handy for drawing the [custom drag layers with `DragLayer`](docs-drag-layer.html). Note that the custom drag previews don't work in IE.

* **`NativeTypes`**: an enumeration of three constants, `NativeTypes.FILE`, `NativeTypes.URL` and `NativeTypes.TEXT`. You may register the [drop targets](docs-drop-target.html) for these types to handle the drop of the native files, URLs, or the regular page text.

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

