react-dnd
=========

[![Join the chat at https://gitter.im/gaearon/react-dnd](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gaearon/react-dnd?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

HTML5 drag-and-drop mixin for React with full DOM control.  

## Prior Work

Check these first and see if they fit your use case.

* [react-draggable](https://github.com/mzabriskie/react-draggable) by [Matt Zabriskie](https://github.com/mzabriskie)
* [react-sortable](https://github.com/danielstocks/react-sortable) by [Daniel Stocks](https://github.com/danielstocks)
* [react-dropzone](https://github.com/paramaggarwal/react-dropzone) by [Param Aggarwal](https://github.com/paramaggarwal)

If they don't, read on.

## Examples

After cloning the project, run:

```
npm install
npm start
open http://localhost:8080/
```

This will run the included examples.  
Or you can **[view them in browser](http://gaearon.github.io/react-dnd/)** (and see their **[source code](https://github.com/gaearon/react-dnd/tree/master/examples)**).


## Installation

The library can be used separately (`dist/ReactDND.min.js`) or with a bundler such as Webpack or Browserify.

```
npm install --save react-dnd
```

Dependencies: Flux and a couple of functions from lodash-node;  
Peer Dependencies: React >= 0.12.0.

It is written in ES6 but there's an ES5 version in `dist-modules` folder.  
The ES5 version is what you get when you `require('react-dnd')`.

The examples use ES6.

## Rationale

Existing drag-and-drop libraries didn't fit my use case so I wrote my own. It's similar to the code we've been running for about a year on Stampsy.com, but rewritten to take advantage of React and Flux.

Key requirements:

* Emit zero DOM or CSS of its own, leaving it to the consuming components;
* Impose as little structure as possible on consuming components;
* Use HTML5 drag and drop as primary backend but make it possible to add different backends in the future;
* Like original HTML5 API, emphasize dragging data and not just “draggable views”;
* Support dropping files;
* Hide [HTML5 API quirks](http://www.quirksmode.org/blog/archives/2009/09/the_html5_drag.html) from the consuming code;
* Different components may be “drag sources” or “drop targets” for different kinds of data;
* Allow one component to contain several drag sources and drop targets when needed;
* Make it easy for drop targets to change their appearance if compatible data is being dragged or hovered;
* Make it easy to use images for drag thumbnails instead of element screenshots, circumventing [browser quirks](http://stackoverflow.com/questions/7340898/html5-setdragimage-only-works-sometimes).

Hopefully the resulting API reflects that.

## Snippets

### Simple Drag Source

First, declare types of data that can be dragged. This library, in vein of native drag and drop API, emphasizes dragging *data* and not specific DOM nodes themselves. Drag sources provide data to be dragged, and drag targets choose to either accept or decline data depending on its type.

It is up to you to update your models in response to drop or other drag events. The library won't touch the DOM nodes. You have full control over your DOM. This makes react-dnd very flexible: you can implement [selective drop targets](http://gaearon.github.io/react-dnd/#/dustbin-interesting), [2D dragging on a plane](http://gaearon.github.io/react-dnd/#/drag-around-custom) or [a sortable](http://gaearon.github.io/react-dnd/#/sortable-simple) with the same set of tools.

String “types” are used to check compatibility of drag sources and drop targets:

```javascript
// A sample ItemTypes.js enumeration for an app where you can drag images and blocks
module.exports = {
  BLOCK: 'block',
  IMAGE: 'image'
};
```

These types are just string constants that are used to match compatible drag sources and drop targets. Even if you only plan to have one draggable type of items, it's still neccessary to declare a string constant for it. This makes it trivial to later add additional draggable/droppable types without rewriting half of your drag and drop code. Also, always relying on types allows us to elegantly support file drag and drop via a “builtin” `NativeDragItemTypes.FILE` type.

Let's make a very simple draggable component that, when dragged, represents `IMAGE`:

```javascript
/**
 * Don't panic!
 * Examples will use ES6 syntax.
 *
 *   var { DragDropMixin } = require('react-dnd');
 *
 * is equivalent to this in ES5:
 *
 *   var DragDropMixin = require('react-dnd').DragDropMixin;
 */

var { DragDropMixin } = require('react-dnd'),
    ItemTypes = require('./ItemTypes');

var Image = React.createClass({
  mixins: [DragDropMixin],
  
  configureDragDrop(registerType) {

    // Specify all supported types by calling registerType(type, { dragSource?, dropTarget? })
    registerType(ItemTypes.IMAGE, {

      // dragSource, when specified, is { beginDrag(), canDrag()?, endDrag(dropEffect)? }
      dragSource: {

        // beginDrag should return { item, dragAnchors?, dragPreview?, dragEffect? }
        beginDrag() {
          return {
            item: this.props.image
          };
        }
      }
    });
  },
  
  render() {

    // {...this.dragSourceFor(ItemTypes.IMAGE)} will expand into
    // { draggable: true, onDragStart: (handled by mixin), onDragEnd: (handled by mixin) }.

    return (
      <img src={this.props.image.url}
           {...this.dragSourceFor(ItemTypes.IMAGE)} />
    );
  }
);
```

By specifying `configureDragDrop`, we tell `DragDropMixin` the drag-drop behavior of this component. Both draggable and droppable components use the same mixin.

Inside `configureDragDrop`, we need to call `registerType` for each of our custom `ItemTypes` that component supports. For example, there might be several representations of images in your app, and each would provide a `dragSource` for `ItemTypes.IMAGE`.

A `dragSource` is just an object specifying how the drag source works. You must implement `beginDrag` to return `item` that represents the data you're dragging and, optionally, a few options that adjust the dragging UI. You can optionally  `canDrag` to forbid dragging, or `endDrag(dropEffect)` to execute some logic when the drop has (or has not) occured. And you can share this logic between components by letting a shared mixins generate `dragSource` for them.

Finally, you must use `{...this.dragSourceFor(itemType)}` on some (one or more) elements in `render` to attach drag handlers. This means you can have several “drag handles” in one element, and they may even correspond to different item types. (If you're not familiar with [JSX Spread Attributes syntax](https://gist.github.com/sebmarkbage/07bbe37bc42b6d4aef81), check it out).

### Simple Drop Target

Let's say we want `ImageBlock` to be a drop target for `IMAGE`s. It's pretty much the same, except that we need to give `registerType` a `dropTarget` implementation:

```javascript
var { DragDropMixin } = require('react-dnd'),
    ItemTypes = require('./ItemTypes');

var ImageBlock = React.createClass({
  mixins: [DragDropMixin],
  
  configureDragDrop(registerType) {

    registerType(ItemTypes.IMAGE, {

      // dropTarget, when specified, is { acceptDrop(item)?, canDrop(item)? enter(item)?, over(item)?, leave(item)? }
      dropTarget: {
        acceptDrop(image) {
          // Do something with image! for example,
          DocumentActionCreators.setImage(this.props.blockId, image);
        }
      }
    });
  },
  
  render() {

    // {...this.dropTargetFor(ItemTypes.IMAGE)} will expand into
    // { onDragEnter: (handled by mixin), onDragOver: (handled by mixin), onDragLeave: (handled by mixin), onDrop: (handled by mixin) }.

    return (
      <div {...this.dropTargetFor(ItemTypes.IMAGE)}>
        {this.props.image &&
          <img src={this.props.image.url} />
        }
      </div>
    );
  }
);
```

### Drag Source + Drop Target In One Component

Say we now want the user to be able to *drag out* an image out of `ImageBlock`. We just need to add appropriate `dragSource` to it and a few handlers:

```javascript
var { DragDropMixin } = require('react-dnd'),
    ItemTypes = require('./ItemTypes');

var ImageBlock = React.createClass({
  mixins: [DragDropMixin],
  
  configureDragDrop(registerType) {

    registerType(ItemTypes.IMAGE, {

      // Add a drag source that only works when ImageBlock has an image:
      dragSource: {
        canDrag() {
          return !!this.props.image;
        },
        
        beginDrag() {
          return {
            item: this.props.image
          };
        }
      },
  
      dropTarget: {
        acceptDrop(image) {
          DocumentActionCreators.setImage(this.props.blockId, image);
        }
      }
    });
  },
  
  render() {

    return (
      <div {...this.dropTargetFor(ItemTypes.IMAGE)}>

        {/* Add {...this.dragSourceFor} handlers to a nested node */}
        {this.props.image &&
          <img src={this.props.image.url}
               {...this.dragSourceFor(ItemTypes.IMAGE)} />
        }
      </div>
    );
  }
);
```

### Dropping Files from the Hard Drive

The library provides one built-in item type: `NativeDragItemTypes.FILE`. You can't set up a drag source for it, but you can set up as many drop targets as you want with the same API as normal drop targets. The only way in which file drop target differs  from a normal one is that `item` parameter will always be `null` in `enter`, `over` and `leave`. In `drop`, its `files` property will contain a JS array of filenames as given by browser.

```javascript
var { DragDropMixin, NativeDragItemTypes } = require('react-dnd');

var ImageUploader = React.createClass({
  mixins: [DragDropMixin],
  
  configureDragDrop(registerType) {
    registerType(NativeDragItemTypes.FILE, {
      dropTarget: {
        acceptDrop(item) {
          // Do something with files
          console.log(item.files);
        }
      }
    });
  },
  
  render() {
    var fileDropState = this.getDropState(NativeDragItemTypes.FILE);

    return (
      <div {...this.dropTargetFor(NativeDragItemTypes.FILE)}>
        {fileDropState.isDragging && !fileDropState.isHovering &&
          <p>Drag file here</p>
        }
        {fileDropState.isHovering &&
          <p>Release to upload a file</p>
        }
      </div>
    );
  }
);
```

### What Else Is Possible?

I have not covered everything but it's possible to use this API in a few more ways:

* Use `getDragState(type)` and `getDropState(type)` to learn if dragging is active and use it to toggle CSS classes or attributes;
* Specify `dragPreview` to be `Image` to use images as drag placeholders (use `ImagePreloaderMixin` to load them);
* Say, we want to make `ImageBlock`s reorderable. We only need them to implement `dropTarget` and `dragSource` for `ItemTypes.BLOCK`.
* Suppose we add other kinds of blocks. We can reuse their reordering logic by placing it in a mixin.
* `dropTargetFor(...types)` allows to specify several types at once, so one drop zone can catch many different types.
* When you need more fine-grained control, most methods are passed drag event that caused them as the last parameter.

## API

### `require('react-dnd').DragDropMixin`

`configureDragDrop(registerType)`

Gives you a chance to configure drag and drop on your component.  
Components with `DragDropMixin` will have this method.

`registerType(type, { dragSource?, dropTarget? })`

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

* `beginDrag(e: SyntheticEvent)` — return value must contain `item: Object` representing your data and may also contain `dragPreview: (Image | HTMLElement)?`, `dragAnchors: { horizontal: HorizontalDragAnchors?, vertical: VerticalDragAnchors? }?`, `effectsAllowed: DropEffects[]?`.

* `canDrag(e: SyntheticEvent)` — optionally decide whether to allow dragging.

* `endDrag(effect: DropEffect?, e: SyntheticEvent)` — optionally handle end of dragging operation. `effect` is falsy if item was dropped outside compatible drop targets, or if drop target returned `null` from `getDropEffect()`.

===================

### Drop Target API

To perform side effects in response to changing drag state, use these methods:

* `enter(item: Object, e: SyntheticEvent)`

* `leave(item: Object, e: SyntheticEvent)`

* `over(item: Object, e: SyntheticEvent)`

For example, you might use `over` for reordering items when they overlap. If you need to render different states when drop target is active or hovered, it is easier to use `this.getDropState(type)` in `render` method.

Implement these methods to specify drop behavior of a component:

* `canDrop(item: Object): Boolean` — optionally implement this method to reject some of the items.

* `getDropEffect(effectsAllowed: DropEffect[]): DropEffect?` — optionally implement this method to specify drop effect that will be used by some browser for cursor, and will be passed to drag source's `endDrag`. Returned drop effect must be one of the `effectsAllowed` specified by drag source or `null`. Default implementation returns `effectsAllowed[0]`.

* `acceptDrop(item: Object, e: SyntheticEvent, isHandled: bool, effect: DropEffect?)` — optionally implement this method to perform some action when drop occurs. `isHandled` is `true` if some child drop target has already handled drop. `effect` is the drop effect you returned from `getDropEffect`, or if `isHandled` is `true`, drop effect of the child drop target that handled the drop.

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
configureDragDrop(registerType) {
  registerType(ItemTypes.MY_ITEM, {
    dragSource: {
      canDrag() {
        return this.hasPreloadedImage('some-img-url1');
      },

      beginDrag() {
        return {
          item: ...,
          dragPreivew: this.getPreloadedImage('some-img-url1');
        };
      }
    }
  });
}
```

Above code will load the images after `componentDidMount` is executed, and cache them until component unmounted. In `componentDidUpdate`, mixin will check if `getImageUrlsToPreload` has changed, and load images again if needed.

Note that, for best results, you want to use `this.getDragImageScale()`. It will return correct scale to download for your images, considering browser differences in handling Retina screens (should either return `1` or `window.devicePixelRatio`). You can either use it with a custom server image resizer, or to choose between normal and `@2x` versions of predefined images.

### `require('react-dnd').NativeDragItemTypes`

Provides a single constant, `NativeDragItemTypes.FILE`, that you can use as an item type for file drop targets.

### `require('react-dnd').DropEffects`

Provides constants to be passed in `effectsAllowed` array from `beginDrag()` and returned from drop target's `getDropEffect()`. Correponds to singular native [`dataTransfer.dropEffect`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer#dropEffect.28.29) values.

## Thanks

This library is a React port of an API, parts of which were originally written by [Andrew Kuznetsov](http://github.com/cavinsmith/).
