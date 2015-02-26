React DnD
=========

[![Join the chat at https://gitter.im/gaearon/react-dnd](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gaearon/react-dnd?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
eve
Drag and drop for React with full DOM control. 

Currently works on top of HTML5 drag-and-drop API, but is moving towards a swappable implementation. Support for touch events is on the roadmap but not currently implemented.

## Philosophy

* Keep user in full control over rendering;
* Don't make assumptions about consuming components and their structure;
* Hide underlying implementation and its quirks;
* Make 80% easy, 20% possible.

## Live Demo

#### [See it in action!](http://gaearon.github.io/react-dnd/) ([Source](https://github.com/gaearon/react-dnd/tree/master/examples))

Demo contains a variety of things you can implement with this library, including:

* Reacting to hover and dropping;
* Dropping files;
* Dragging a box around with snapping;
* Drawing a custom drag layer;
* Making cards sortable.

You can do much more, but these examples will help you get started!

## Features

* Emits zero DOM or CSS of its own;
* Like original HTML5 API, emphasizes dragging data and not just “draggable views”;
* Support dropping files using the same API;
* Lets components register as “drag sources” or “drop targets” for different kinds of data;
* Lets a single component contain several drag sources and drop targets;
* Lets you provide a custom drag handle, whether DOM subnode or an image;
* Takes the best from HTML5 API but [hides its many quirks](http://www.quirksmode.org/blog/archives/2009/09/the_html5_drag.html):
  - doesn't require you to `preventDefault` anything to start working;
  - emits `enter` and `leave` as you'd expect instead of doing it for every child node;
  - lets you read drag state from `render()`;
  - consistently fires events even if source DOM node was removed;
* Includes a helper to preload images for drag thumbnails;
* Lets you render a custom drag layer if you'd rather draw your own drag preview.

## Documentation

### SemVer

We plan to follow SemVer after 1.0. Before 1.0, minor version bumps may contain breaking changes. Breaking changes will be documented in the **[Upgrade Guide](https://github.com/gaearon/react-dnd/blob/master/docs/UPGRADE_GUIDE.md)**.

### API Reference

Complete API reference is available **[here](https://github.com/gaearon/react-dnd/tree/master/docs/API.md)**.

### Walkthrough

If you don't feel comfortable diving into examples source code just yet, you can start with **[the walkthrough](https://github.com/gaearon/react-dnd/tree/master/docs/Walkthrough.md)**.

### Examples

Have you played with **[live demo](http://gaearon.github.io/react-dnd/)** yet? Here's **[the source code for it](https://github.com/gaearon/react-dnd/tree/master/examples)**.

To try it locally, clone the project and run:

```
npm install
npm start
open http://localhost:8080/
```

Examples use [ES6 syntax](https://babeljs.io/docs/learn-es6/).

## Installation

The library can be used separately (`dist/ReactDND.min.js`) or with a bundler such as Webpack or Browserify.

```
npm install --save react-dnd
```

## Future Roadmap

* Touch support;
* Support for mouse events instead of HTML5 drag-and-drop events;
* Dragging multiple items at once.

## Production Usage

* [Stampsy](http://stampsy.com), where it was originally developed, is using React DnD for the post editor.
* [Add your company!](https://github.com/gaearon/react-dnd/edit/master/README.md)

## See Also

* [react-draggable](https://github.com/mzabriskie/react-draggable) by [Matt Zabriskie](https://github.com/mzabriskie)
* [react-sortable](https://github.com/danielstocks/react-sortable) by [Daniel Stocks](https://github.com/danielstocks)
* [react-dropzone](https://github.com/paramaggarwal/react-dropzone) by [Param Aggarwal](https://github.com/paramaggarwal)

## Thanks

This library is a React port of an API, parts of which were originally written by [Andrew Kuznetsov](http://github.com/cavinsmith/).

A lot of recent progress is due to [Nathan Hutchison](https://github.com/nelix)'s contributions and effort.
