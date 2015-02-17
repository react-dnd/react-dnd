## API

### `require('react-dnd').DragDropMixin`

`statics.configureDragDrop(register)`

Gives you a chance to configure drag and drop on your component.  
Components with `DragDropMixin` will have this method.

`register(type, { dragSource?, dropTarget? })`

Call this method to specify component behavior as drag source or drop target for given type.
This method is passed as a parameter to `configureDragDrop`.

`getDragState(type)`

Returns `{ isDragging: bool }` describing whether a particular type is being dragged from this component's drag source. You may want to call this method from `render`, e.g. to hide an element that is being dragged.

`getDropState(type)`

Returns `{ isDragging: bool, isHovering: bool }` describing whether a particular type is being dragged or hovered, when it is compatible with this component's drop source. You may want to call this method from `render`, e.g. to highlight drop targets when they are comparible and when they are hovered.

`dragSourceFor(type)`

Returns props to be given to any DOM element you want to make a drag source. Intended to be used with JSX spread attribute syntax.

`dropTargetFor(types...)`

Returns props to be given to any DOM element you want to make a drop target. Intended to be used with JSX spread attribute syntax.

===================

### Drag Source API

Implement to specify drag behavior of a component:

* `beginDrag(component: ReactComponent, e: SyntheticEvent)` — return value must contain `item: Object` representing your data and may also contain `dragPreview: (Image | HTMLElement)?`, `dragAnchors: { horizontal: HorizontalDragAnchors?, vertical: VerticalDragAnchors? }?`, `effectsAllowed: DropEffects[]?`.

* `canDrag(component: ReactComponent, e: SyntheticEvent)` — optionally decide whether to allow dragging.

* `endDrag(component: ReactComponent, effect: DropEffect?, e: SyntheticEvent)` — optionally handle end of dragging operation. `effect` is falsy if item was dropped outside compatible drop targets, or if drop target returned `null` from `getDropEffect()`.

===================

### Drop Target API

To perform side effects in response to changing drag state, use these methods:

* `enter(component: ReactComponent, item: Object, e: SyntheticEvent)`

* `leave(component: ReactComponent, item: Object, e: SyntheticEvent)`

* `over(component: ReactComponent, item: Object, e: SyntheticEvent)`

For example, you might use `over` for reordering items when they overlap. If you need to render different states when drop target is active or hovered, it is easier to use `this.getDropState(type)` in `render` method.

Implement these methods to specify drop behavior of a component:

* `canDrop(component: ReactComponent, item: Object): Boolean` — optionally implement this method to reject some of the items.

* `getDropEffect(component: ReactComponent, effectsAllowed: DropEffect[]): DropEffect?` — optionally implement this method to specify drop effect that will be used by some browser for cursor, and will be passed to drag source's `endDrag`. Returned drop effect must be one of the `effectsAllowed` specified by drag source or `null`. Default implementation returns `effectsAllowed[0]`.

* `acceptDrop(component: ReactComponent, item: Object, e: SyntheticEvent, isHandled: bool, effect: DropEffect?)` — optionally implement this method to perform some action when drop occurs. `isHandled` is `true` if some child drop target has already handled drop. `effect` is the drop effect you returned from `getDropEffect`, or if `isHandled` is `true`, drop effect of the child drop target that handled the drop.

===================

### `require('react-dnd').ImagePreloaderMixin`

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

### `require('react-dnd').NativeDragItemTypes`

Provides a single constant, `NativeDragItemTypes.FILE`, that you can use as an item type for file drop targets.

### `require('react-dnd').DropEffects`

Provides constants to be passed in `effectsAllowed` array from `beginDrag()` and returned from drop target's `getDropEffect()`. Correponds to singular native [`dataTransfer.dropEffect`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer#dropEffect.28.29) values.
