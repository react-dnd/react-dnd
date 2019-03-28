---
path: '/docs/api/drag-source-connector'
title: 'DragSourceConnector'
---

_New to React DnD? [Read the overview](/docs/overview) before jumping into the docs._

# DragSourceConnector

`DragSourceConnector` is an object passed to the _collecting function_ of the [`DragSource`](/docs/api/drag-source). It provides the ability to bind your React component to the Drag Source role.

## Properties

- **`dragSource() => (Element | Node | Ref, options?)`**: Returns a function that must be prop-injected into your component and used in that component's `render()` method. You may pass this function a react component, an DOM element, or a ref object to this method.

- **`dragPreview() => (Element | Node | Ref, options?)`**_(optional)_: Returns a function that may be used inside the component to assign the drag preview role to a node. By returning `{ connectDragPreview: connect.dragPreview() }` from your collecting function, you can mark any React element as the drag preview node. To do that, replace any `element` with `this.props.connectDragPreview(element)` inside the `render` function. The drag preview is the node that will be screenshotted by the [HTML5 backend](/docs/backends/html5) when the drag begins. For example, if you want to make something draggable by a small custom handle, you can mark this handle as the `dragSource()`, but also mark an outer, larger component node as the `dragPreview()`. Thus the larger drag preview appears on the screenshot, but only the smaller drag source is actually draggable. Another possible customization is passing an [`Image`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image) instance to `dragPreview` from a lifecycle method like `componentDidMount`. This lets you use the actual images for drag previews. (Note that IE does not support this customization). See the example code below for the different usage examples.

### Method Options

The functions returned by the connector methods also accept options. They need to be passed _inside the component_, for example, `this.props.connectDragSource(<div>...</div>, { dropEffect: 'copy' })`. The options described below are supported by the [HTML5 backend](.//docs/backends/html5), but may not be supported by the third-party or custom backends.

#### **Options for `dragSource`**

- `dropEffect`: Optional. A string. By default, `'move'`. In the browsers that support this feature, specifying `'copy'` shows a special “copying” cursor, while `'move'` corresponds to the “move” cursor. You might want to use this option to provide a hint to the user about whether an action is destructive.

#### **Options for `dragPreview`**

- `captureDraggingState`: Optional. A boolean. By default, `false`. If `true`, the component will learn that it is being dragged immediately as the drag starts instead of the next tick. This means that the screenshotting would occur with `monitor.isDragging()` already being `true`, and if you apply any styling like a decreased opacity to the dragged element, this styling will also be reflected on the screenshot. This is rarely desirable, so `false` is a sensible default. However, you might want to set it to `true` in rare cases, such as if you want to make the custom drag layers work in IE and you need to hide the original element without resorting to an empty drag preview which IE doesn't support.

- `anchorX`: Optional. A number between `0` and `1`. By default, `0.5`. Specifies how the offset relative to the drag source node is translated into the horizontal offset of the drag preview when their sizes don't match. `0` means “dock the preview to the left”, `0.5` means “interpolate linearly” and `1` means “dock the preview to the right”.

- `anchorY`: Optional. A number between `0` and `1`. By default, `0.5`. Specifies how the offset relative to the drag source node is translated into the vertical offset of the drag preview when their sizes don't match. `0` means “dock the preview to the top, `0.5` means “interpolate linearly” and `1` means “dock the preview to the bottom.

- `offsetX`: Optional. A number or null if not needed. By default, null. Specifies the vertical offset between the cursor and the drag preview element. If offsetX has a value, anchorX won't be used.

- `offsetY`: Optional. A number or null if not needed. By default, null. Specifies the vertical offset between the cursor and the drag preview element. If offsetY has a value, anchorY won't be used.

## Usage

```jsx
import React from 'react';
import { DragSource } from 'react-dnd';

/* ... */

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

class ComponentWithCopyEffect {
  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div>
        This div shows a plus icon in some browsers.
      </div>,
      { dropEffect: 'copy' }
    );
  }
});
ComponentWithCopyEffect = DragSource(type, {/* ... */}, collect)(ComponentWithCopyEffect);

class ComponentWithHandle {
  render() {
    const { connectDragSource, connectDragPreview } = this.props;

    return connectDragPreview(
      <div>
        This div is draggable by a handle!
        {connectDragSource(
          <div>drag me</div>
        )}
      </div>
    );
  }
}
ComponentWithHandle = DragSource(type, {/* ... */}, collect)(ComponentWithHandle);

class ComponentWithImagePreview {
  componentDidMount() {
    const { connectDragPreview } = this.props;

    const img = new Image();
    img.src = 'http://mysite.com/image.jpg';
    img.onload = () => connectDragPreview(img);
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div>
        This div shows an image when dragged!
      </div>
    );
  }
}
ComponentWithImagePreview = DragSource(type, {/* ... */}, collect)(ComponentWithImagePreview);
```

### Example

Check out [the tutorial](/docs/tutorial) for more real examples!
