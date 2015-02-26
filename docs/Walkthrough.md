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

  statics: {
    configureDragDrop(register) {

      // Specify all supported types by calling register(type, { dragSource?, dropTarget? })

      register(ItemTypes.IMAGE, {

        // dragSource, when specified, is {
        //   beginDrag(component),
        //   canDrag(component)?,
        //   endDrag(component, dropEffect)?
        // }

        dragSource: {

          // beginDrag should return {
          //   item,
          //   dragAnchors?,
          //   dragPreview?,
          //   dragEffect?
          // }

          beginDrag(component) {
            return {
              item: component.props.image
            };
          }
        }
      });
    }
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

By specifying `configureDragDrop` in `statics`, we tell `DragDropMixin` the drag-drop behavior of this component. Both draggable and droppable components use the same mixin.

Inside `configureDragDrop`, we need to call `register` for each of our custom `ItemTypes` that component supports. For example, there might be several representations of images in your app, and each would provide a `dragSource` for `ItemTypes.IMAGE`.

A `dragSource` is just an object specifying how the drag source works. You must implement `beginDrag(component)` to return `item` that represents the data you're dragging and, optionally, a few options that adjust the dragging UI. You can optionally  `canDrag(component)` to forbid dragging, or `endDrag(component, dropEffect)` to execute some logic when the drop has (or has not) occured. And you can share this logic between components by letting a shared mixins generate `dragSource` for them.

Finally, you must use `{...this.dragSourceFor(itemType)}` on some (one or more) elements in `render` to attach drag handlers. This means you can have several “drag handles” in one element, and they may even correspond to different item types. (If you're not familiar with [JSX Spread Attributes syntax](https://gist.github.com/sebmarkbage/07bbe37bc42b6d4aef81), check it out).

### Simple Drop Target

Let's say we want `ImageBlock` to be a drop target for `IMAGE`s. It's pretty much the same, except that we need to give `register` a `dropTarget` implementation:

```javascript
var { DragDropMixin } = require('react-dnd'),
    ItemTypes = require('./ItemTypes');

var ImageBlock = React.createClass({
  mixins: [DragDropMixin],

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.IMAGE, {

        // dropTarget, when specified, is {
        //   acceptDrop(component, item)?,
        //   canDrop(component, item)?,
        //   enter(component, item)?,
        //   over(component, item)?,
        //   leave(component, item)?
        // }

        dropTarget: {
          acceptDrop(component, image) {
            // Do something with image! For example,
            DocumentActionCreators.setImage(component.props.blockId, image);
          }
        }
      });
    }
  },

  render() {

    // {...this.dropTargetFor(ItemTypes.IMAGE)} will expand into
    // { onDragEnter: (handled by mixin), onDragOver: (handled by mixin), onDragLeave: (handled by mixin), onDrop: (handled by mixin) }

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

  statics: {
    configureDragDrop(register) {
      register(ItemTypes.IMAGE, {

        // Add a drag source that only works when ImageBlock has an image:

        dragSource: {
          canDrag(component) {
            return !!component.props.image;
          },

          beginDrag(component) {
            return {
              item: component.props.image
            };
          }
        },

        dropTarget: {
          acceptDrop(component, image) {
            DocumentActionCreators.setImage(component.props.blockId, image);
          }
        }
      });
    }
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

  statics: {
    configureDragDrop(register) {
      register(NativeDragItemTypes.FILE, {
        dropTarget: {
          acceptDrop(component, item) {
            // Do something with files
            console.log(item.files);
          }
        }
      });
    }
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
* Use `context` (second parameter on `configureDragDrop`) to query mouse position delta.
