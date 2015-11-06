*New to React DnD? [Read the overview](docs-overview.html) before jumping into the docs.*

DragLayer
===================

**This is an advanced feature.**  

For the most use cases, the default rendering of the [HTML5 backend](docs-html5-backend.html) should suffice. However, its drag preview has certain limitations. For example, it has to be an existing node screenshot or an image, and it cannot change midflight.

Sometimes you might want to perform the custom rendering. This also becomes necessary if you're using a custom backend. `DragLayer` lets you perform the rendering of the drag preview yourself using just the React components. It is a higher-order component accepting one required parameter that is described below.

To use `DragLayer`, don't forget to wrap the top-level component of your app in a [`DragDropContext`](docs-drag-drop-context.html).

### Signature

`DragLayer` uses partial application. After specifying its only parameter with the first call, you need to pass your React component class as the only parameter in the second call. This signature makes `DragLayer` usable as an ES7 decorator. Read the [overview](docs-overview.html) for a more detailed explanation of the decorators and the higher-order components.

-------------------
```js
var DragLayer = require('react-dnd').DragLayer;

var CustomDragLayer = React.createClass({
  /* ... */
});

module.exports = DragLayer(collect)(CustomDragLayer);
```
-------------------
```js
import { DragLayer } from 'react-dnd';

class CustomDragLayer {
  /* ... */
}

export default DragLayer(collect)(CustomDragLayer);
```
-------------------
```js
import { DragLayer } from 'react-dnd';

@DragLayer(collect)
export default class CustomDragLayer {
  /* ... */
}
```
-------------------

### Parameters

* **`collect`**: Required. The collecting function. It should return a plain object of the props to inject into your component. It receives a single `monitor` parameter. Read the [overview](docs-overview.html) for an introduction to the monitors and the collecting function. See the collecting function described in detail in the next section.

* **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)` function inside the `options` object can improve the performance. Unless you have performance problems, don't worry about it.

### The Collecting Function

The collecting function signature is similar to the collecting functions of [`DragSource`](docs-drag-source.html) and [`DropTarget`](docs-drop-target.html), except that it doesn't have a `connect` parameter because the drag layer is not interactive and only *reflects* the drag state. The collecting function is called any time the global drag state changes, including the coordinate changes, so that your component can provide a timely updated custom drag preview. You can ask the `monitor` for the client coordinates of the dragged item.

#### Parameters

* **`monitor`**: An instance of [`DragLayerMonitor`](docs-drag-layer-monitor.html). You can use it to query the information about the current drag state, including the coordinates. Read the [`DragLayerMonitor` documentation](docs-drag-layer-monitor.html) for a complete list of `monitor` methods, or read the [overview](docs-overview.html) for an introduction to the monitors.

### Return Value

`DragLayer` wraps your component and returns another React component.  
For easier [testing](docs-testing.html), it provides an API to reach into the internals:

#### Static Properties

* **`DecoratedComponent`**: Returns the wrapped component type.

#### Instance Methods

* **`getDecoratedComponentInstance()`**: Returns the wrapped component instance.

### Example

-------------------
```js
var React = require('react');
var PropTypes = React.PropTypes;
var ItemTypes = require('./ItemTypes');
var BoxDragPreview = require('./BoxDragPreview');
var DragLayer = require('react-dnd').DragLayer;

var layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  var currentOffset = props.currentOffset;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  var x = currentOffset.x;
  var y = currentOffset.y;
  var transform = 'translate(' + x + 'px, ' + y + 'px)';
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

var CustomDragLayer = React.createClass({
  propTypes: {
    item: PropTypes.object,
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  },

  renderItem: function (type, item) {
    switch (type) {
    case ItemTypes.BOX:
      return (
        <BoxDragPreview title={item.title} />
      );
    }
  },

  render: function () {
    var item = this.props.item;
    var itemType = this.props.itemType;
    var isDragging = this.props.isDragging;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
});

module.exports = DragLayer(collect)(CustomDragLayer);
```
-------------------
```js
import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import BoxDragPreview from './BoxDragPreview';
import snapToGrid from './snapToGrid';
import { DragLayer } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

class CustomDragLayer {
  renderItem(type, item) {
    switch (type) {
    case ItemTypes.BOX:
      return (
        <BoxDragPreview title={item.title} />
      );
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }),
  isDragging: PropTypes.bool.isRequired
};

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  };
}

export default DragLayer(collect)(CustomDragLayer);
```
-------------------
```js
import React, { PropTypes } from 'react';
import ItemTypes from './ItemTypes';
import BoxDragPreview from './BoxDragPreview';
import snapToGrid from './snapToGrid';
import { DragLayer } from 'react-dnd';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform: transform,
    WebkitTransform: transform
  };
}

@DragLayer(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging()
}))
export default class CustomDragLayer {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
  };

  renderItem(type, item) {
    switch (type) {
    case ItemTypes.BOX:
      return (
        <BoxDragPreview title={item.title} />
      );
    }
  }

  render() {
    const { item, itemType, isDragging } = this.props;
    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          {this.renderItem(itemType, item)}
        </div>
      </div>
    );
  }
}
```
-------------------
