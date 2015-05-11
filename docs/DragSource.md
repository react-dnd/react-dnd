DragSource (higher-order component)
===================

Wrap your component with `DragSource` to make it dragggable.

### Parameters

* **`type`**: Required. Either a string, an ES6 symbol, or a function that returns either, given component's `props`. It uniquely identifies the kind of data that this drag source provides. The type is then used to match compatible drag sources and drop targets. You should share a few type constants between the components so they can register sources and targets for the same types of data.

* **`spec`**: Required. A plain JavaScript object with a few allowed methods on it. It describes how the drag source reacts to the drag and drop events. See the drag source specification described in detail in the next section.

* **`collect`**: Required. A function. It should return a plain object of the props to inject into your component. It receives two parameters: `connect` and `monitor`. See the example below to learn how to use them to connect the DnD event handlers to React elements and query the current drag state.

* **`options`**: Optional. A plain object. If some of the props to your component are not scalar (that is, are not primitive values or functions), specifying a custom `arePropsEqual(props, otherProps)` function as an `options` key can improve the performance. Unless you have performance problems, don't worry about it.

### Drag Source Specification

The second `spec` parameter must be a plain object implementing the drag source specification. Below is the list of all methods that it may have.

#### Methods

* **`beginDrag(props, monitor, component)`**: Required. When the dragging starts, `beginDrag` is called. You must return a plain JavaScript object describing the data being dragged. What you return is the *only* information available to the drop targets about the drag source so it's important to pick the *minimal* data they need to know. You may be tempted to put a reference to the `component` into it, but you should try very hard to avoid doing this because it couples the drag sources and drop targets. It's a good idea to return something like `{ id: props.id }` from this method.

* **`endDrag(props, monitor, component)`**: Optional. When the dragging stops, `endDrag` is called. For every `beginDrag` call, a corresponding `endDrag` call is guaranteed. You may call `monitor.didDrop()` to check whether or not the drop was handled by a compatible drop target. Use `monitor.getDropResult()` to get the “drop result” object optionally specified by the drop target. It is a good place to fire a Flux action. *Note: If the component is unmounted while dragging, `component` parameter is set to be `null`.*

* **`canDrag(props, monitor)`**: Optional. Use it to specify whether the dragging is currently allowed. If you want to always allow it, just omit this method. Specifying it is handy if you'd like to disable dragging based on some predicate over `props`. *Note: You may not call `monitor.canDrag()` inside this method.*

* **`isDragging(props, monitor)`**: Optional. By default, only the drag source that started the drag operation is considered to be dragging. You can override this behavior by defining a custom `isDragging` method. It might return something like `props.id === monitor.getItem().id`. Do this if the original component may be unmounted during the dragging and later “resurrected” with a different parent. For example, when moving a card across the lists in a Kanban board, you want it to retain the dragged appearance—even though technically, the component gets unmounted and a different one gets mounted every time you move it to another list. *Note: You may not call `monitor.isDragging()` inside this method.*

#### Method Parameters

* **`props`**: Your component's current props.

* **`monitor`**: An instance of [`DragSourceMonitor`](/api-drag-source-monitor.html). Use it to query the information about the current drag state, such as the currently dragged item and its type, the current and initial coordinates and offsets, and whether it was dropped yet. Refer to the [`DragSourceMonitor` documentation](api-drag-source-monitor.html) for a complete list of `monitor` methods.

* **`component`**: When specified, it is the instance of your component. Use it to access the underlying DOM node for position or size measurements, or to call `setState`, and other component methods. It is purposefully missing from `isDragging` and `canDrag` because the instance may not be available by the time they are called. If you want these methods to depend on the component's state, consider lifting the state to the parent component, so that you could just use `props`. Generally your code will be cleaner if you rely on `props` instead whenever possible.

### Nesting Behavior

If a drag source is nested in another drag source, the innermost drag source of the compatible type wins. Drag sources that return `false` from `canDrag` are skipped. The chosen drag source is the only one that will receive `beginDrag` and, subsequently, `endDrag`. There is no propagation once the drag source is determined.

### Example

-------------------
```js
// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
var Types = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
var CardSource = {
  beginDrag: function (props) {
    // Specify the data describing dragged item
    return {
      id: props.id
    };
  },

  endDrag: function (props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    var item = monitor.getItem();
    var dropResult = monitor.getDropResult();
    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

var Card = React.createClass({
  render: function () {
    // Your component receives its own props as usual
    var id = this.props.id;

    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    var isDragging = this.props.isDragging;
    var connectDragSource = this.props.connectDragSource;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
});

module.exports = DragSource(Types.CARD, CardSource, collect)(Card);
```
-------------------
```js
// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const CardSource = {
  beginDrag(props) {
    // Specify the data describing dragged item
    return {
      id: props.id
    };
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
}

class Card {
  render() {
    // Your component receives its own props as usual
    const { id } = this.props;

    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
}

export default DragSource(Types.CARD, CardSource, collect)(Card);
```
-------------------
```js
// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card'
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const CardSource = {
  beginDrag(props) {
    // Specify the data describing dragged item
    return {
      id: props.id
    };
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

@DragSource(Types.CARD, CardSource, (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging()
}))
export default class Card {
  render() {
    // Your component receives its own props as usual
    const { id } = this.props;

    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource(
      <div>
        I am a draggable card number {id}
        {isDragging && ' (and I am being dragged now)'}
      </div>
    );
  }
}
```
-------------------

## Type Definitions

```js
type ReactProps = Object;

type DragSourceType =
  string |
  symbol |
  (props: ReactProps) => string | symbol;

type DragSourceSpec = {
  beginDrag: (
    props: ReactProps,
    monitor: DragSourceMonitor,
    component: YourReactClass
  ) => Object;

  endDrag: ?(
    props: ReactProps,
    monitor: DragSourceMonitor,
    component: ?YourReactClass
  ) => void;

  canDrag: ?(
    props: ReactProps,
    monitor: DragSourceMonitor
  ) => boolean;

  isDragging: ?(
    props: Object,
    monitor: DragSourceMonitor
  ) => boolean;
};

// Depends on the backend you're using
type DragSourceConnector = {
  dragSource: () => Function,
  dragPreview: () => Function
};

type DragSourceOptions = {
  arePropsEqual: ?(Object, Object) => boolean
};

DragSource: (
  type: DragSourceType,
  spec: DragSourceSpec,
  collect: (
    connect: DragSourceConnector,
    monitor: DragSourceMonitor
  ) => Object,
  options: ?DragSourceOptions
) => (
  component: YourReactClass
) => ReactClass
```
