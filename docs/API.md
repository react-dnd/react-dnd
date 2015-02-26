# API

Something changed? See [Upgrade Guide](https://github.com/gaearon/react-dnd/blob/master/docs/UPGRADE_GUIDE.md).

## `require('react-dnd')`

Entry point. Returns:

```js
{
  DragDropMixin,
  DragLayerMixin,
  ImagePreloaderMixin,
  NativeDragItemTypes,
  DropEffects,
  HorizontalDragAnchors,
  VerticalDragAnchors
}
```


## Drag Source API

Implement to specify drag behavior of a component:

##### `beginDrag(component: ReactComponent)`

Return value must contain `item: Object` representing your data. Other fields are optional:

```js
{
  item: Object,
  dragPreview: (Image | HTMLElement)?,
  dragAnchors: {
    horizontal: HorizontalDragAnchors?,
    vertical: VerticalDragAnchors?
  }?,
  effectsAllowed: DropEffects[]?
}
```

##### `canDrag(component: ReactComponent)`

Optionally decide whether to allow dragging. Default implementation returns `true`.

##### `endDrag(component: ReactComponent, effect: DropEffect?)`

Optionally handle the end of dragging operation. `effect` is falsy if item was dropped outside compatible drop targets, or if the drop target returned `null` from `getDropEffect()`.

## Drop Target API

##### `enter(component: ReactComponent, item: Object)`

##### `leave(component: ReactComponent, item: Object)`

##### `over(component: ReactComponent, item: Object)`

You can use these methods to perform side effects in response to changing drag state. For example, you might use `over` for reordering items when they overlap.

If you need to render different states when drop target is active or hovered, it is easier to use `this.getDropState(type)` in `render` method.

##### `canDrop(component: ReactComponent, item: Object): Boolean`

Optionally implement this method to reject some of the items.

##### `getDropEffect(component: ReactComponent, effectsAllowed: DropEffect[]): DropEffect?`

Optionally implement this method to specify drop effect that will be used by some browser for cursor, and will be passed to drag source's `endDrag`. This allows drag source and drop target negotiate whether operation represents copying or moving an item. Returned drop effect must be one of the `effectsAllowed` specified by drag source or `null`. Default implementation returns `effectsAllowed[0]`.

##### `acceptDrop(component: ReactComponent, item: Object, isHandled: bool, effect: DropEffect?)`

Optionally implement this method to perform some action when drop occurs. `isHandled` is `true` if some child drop target has already handled the drop. `effect` is the drop effect you returned from `getDropEffect`, or if `isHandled` is `true`, drop effect specified by the child drop target that has already handled the drop.

## `DragDropMixin`

##### `statics.configureDragDrop(register, context: DragDropContext)`

Gives you a chance to configure drag and drop on your component.  
Components with `DragDropMixin` need to implement this method.

`context` allows you to access data specific to current drag operation (see `DragDropContext` below).

##### `register(type, { dragSource?, dropTarget? })`

Call it to specify component behavior as a drag source or a drop target for a given type.
You may call this method several types in one component, as long as `type` is different.

This is the method passed to you by the mixin as a parameter in `configureDragDrop`.  

##### `this.getDragState(type)`

Returns `{ isDragging: bool }` describing whether a particular type is being dragged from this component's drag source. You may want to call this method from `render`, e.g. to hide an element that is being dragged.

##### `this.getDropState(type)`

Returns `{ isDragging: bool, isHovering: bool }` describing whether a particular type is being dragged or hovered, when it is compatible with this component's drop source. You may want to call this method from `render`, e.g. to highlight drop targets when they are comparible and when they are hovered.

##### `this.dragSourceFor(type)`

Returns props to be given to any DOM element you want to make a drag source. Intended to be used with JSX spread attribute syntax.

##### `this.dropTargetFor(types...)`

Returns props to be given to any DOM element you want to make a drop target. Intended to be used with JSX spread attribute syntax.

## `DragDropContext`

This object is provided as a second argument to your `configureDragDrop` method.

##### `getCurrentOffsetDelta()`

Returns `{ x, y }` coordinate delta between current mouse position and its position when dragging started.

## `DragLayerMixin`

Allows you to draw a custom drag layer. This can be used in combination with returning a transparent one-pixel image as `dragPreview` from `beginDrag` so that only your custom layer is visible.

##### `getDragLayerState()`

Returns all you need in order to draw a custom drag layer:

```js
{
  isDragging: bool,
  draggedItemType: string,
  draggedItem: Object,
  initialOffset: { x, y },
  currentOffset: { x, y }
}
```

## `ImagePreloaderMixin`

You can optionally specify images to be used as drag thumbnails.
Browsers can't do this reliably until image is loaded, so `ImagePreloaderMixin` provides an API to do just that:

```javascript
mixins: [DragDropMixin, ImagePreloaderMixin],

// This method should return array of image urls for preloading
getImageUrlsToPreload() {
  return ['some-img-url1', 'some-img-url2'];
},

// You can now use `this.hasPreloadedImage(url)` and `this.getPreloadedImage(url)` in your `dragSource`:
statics: {
  configureDragDrop(register) {
    register(ItemTypes.MY_ITEM, {
      dragSource: {
        canDrag(component) {
          return component.hasPreloadedImage('some-img-url1');
        },

        beginDrag(component) {
          return {
            item: ...,
            dragPreivew: component.getPreloadedImage('some-img-url1');
          };
        }
      }
    });
  }
}
```

Above code will load the images after `componentDidMount` is executed, and cache them until component unmounted. In `componentDidUpdate`, mixin will check if `getImageUrlsToPreload` has changed, and load images again if needed.

Note that, for best results, you want to use `this.getDragImageScale()`. It will return correct scale to download for your images, considering browser differences in handling Retina screens (should either return `1` or `window.devicePixelRatio`). You can either use it with a custom server image resizer, or to choose between normal and `@2x` versions of predefined images.

## `NativeDragItemTypes`

Provides a single constant, `NativeDragItemTypes.FILE`, that you can use as an item type for file drop targets.

## `DropEffects`

Provides constants to be passed in `effectsAllowed` array from `beginDrag()` and returned from drop target's `getDropEffect()`. Correponds to singular native [`dataTransfer.dropEffect`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer#dropEffect.28.29) values.
