---
path: '/docs/troubleshooting'
title: 'Troubleshooting'
---

# Troubleshooting

This page is dedicated to the problems you might bump into while using React DnD.

<!-- Do not edit title. It is referenced from the code. -->

### Could not find the drag and drop manager in the context

There are several ways this error might have happened:

1. You wrapped some component with a [`DragSource`](/docs/api/drag-source), [`DropTarget`](/docs/api/drop-target), or [`DragLayer`](/docs/api/drag-layer), but forgot to wrap your top-level component with the [`DragDropContext`](/docs/api/drag-drop-context).

2. You _have_ wrapped the top-level component with the [`DragDropContext`](/docs/api/drag-drop-context) but exported an unwrapped version by mistake.

3. You are using a component in an isolated environment like a unit test. See the second point for instructions to stub it.

4. The context is lost for some other reason. [Please file an issue](https://github.com/react-dnd/react-dnd/issues/new) if you can reproduce it on a small project.

#### Wrap top-level component with a `DragDropContext`

To fix this error, find the top-level component in your app. Usually, this is the root route handler. It doesn't have to be the topmost component, but it has to be higher in the hierarchy than any of your component using React DnD. Wrap this component with a [`DragDropContext`](/docs/api/drag-drop-context) call. It is important to specify a _backend_ as the only argument in that call. Currently React DnD only provides an [`HTML5` backend](/docs/backends/html5), but touch backend support is coming in the future.

#### Stub the context inside the unit tests

If you have this error in a test, [read the testing guide](/docs/testing) for instructions on stubbing the context.

#### Make sure you that don't have duplicate React

This problem may also appear if you have a duplicate React installation in your Browserify or Webpack build. [This article](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375) explains both the problem and the solution to it.

### You want to inspect what's happening internally with Redux.

You can enable [Redux DevTools](https://github.com/reduxjs/redux-devtools) by adding a `debugMode` prop to your [provider](/docs/api/dnd-provider), with the value of `true`.

```jsx
<DndProvider debugMode={true} backend={HTML5Backend}>
```
