# Upgrade Guide

## 0.8.x -> 0.9.x

This release contains several breaking changes.

### `configureDragDrop` is now static

Declaring `configureDragDrop` as an instance method is now deprecated. You need to put it into `statics` and change all methods to accept `component` as the first parameter instead of using `this`.

If your code looked like this:

```js
  configureDragDrop(register) {
    register(ItemTypes.ITEM, {
      dragSource: {
        beginDrag() {
          return {
            item: {
              name: this.props.name
            }
          };
        }
      }
    });
  }
```

it will now look like this:

```js
  statics: {
    configureDragDrop(register) {
      register(ItemTypes.ITEM, {
        dragSource: {
          beginDrag(component) {
            return {
              item: {
                name: component.props.name
              }
            };
          }
        }
      });
    }
  }
```

### `e` parameter is removed

No drag sources or drop target methods will now accept `e` parameter. It coupled code to a specific drag and drop implementation whereas we want to move to switchable implementations in the future.  
Furthermore users could call `e.stopPropagation()` potentially breaking the inner workings of React DnD.

Bundled examples previously used `e` for calculating mouse position delta while an item was being dragged (or after it was dropped), but this is now possible with `context.getCurrentOffsetDelta()`:

```js
  statics: {
    configureDragDrop(register, context) {
      register(ItemTypes.BOX, {
        dropTarget: {
          acceptDrop(component, item) {
            var delta = context.getCurrentOffsetDelta(),
                left = Math.round(item.left + delta.x),
                top = Math.round(item.top + delta.y);

            component.moveBox(item.id, left, top);
          }
        }
      });
    }
  }
```

If you have other use cases for `e` argument, [let us know in this issue](https://github.com/gaearon/react-dnd/issues/93) and we'll expose them via `context` or other means.

### `acceptDrop` parameter order changes due to `e` being removed

Previously, `acceptDrop` signature was:

```js
acceptDrop(component: ReactComponent, item: Object, e: SyntheticEvent, isHandled: bool, effect: DropEffect?)
```

Now it is:

```js
acceptDrop(component: ReactComponent, item: Object, isHandled: bool, effect: DropEffect?)
```