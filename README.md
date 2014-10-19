react-dnd
=========

HTML5 drag-and-drop mixin for React with full DOM control.  

## Prior Work

Check these first and see if they fit your use case.

* [react-draggable](https://github.com/mzabriskie/react-draggable) by [Matt Zabriskie](Matt Zabriskie)
* [react-sortable](https://www.npmjs.org/package/react-sortable) by [Daniel Stocks](https://github.com/danielstocks/react-sortable)

If they don't, read on.

## Installation

```
npm install --save react-dnd
```

Dependencies: Flux and a couple of functions from lodash-node;  
Peer Dependencies: React >= 0.11.0.

Note: [I'm using ES6 features in this library](https://github.com/gaearon/react-dnd/issues/2), so you may want to enable Harmony transforms in JSX build step. This library has to be used with a bundler such as Webpack (or Browserify).

## Rationale

Existing drag-and-drop libraries didn't fit my use case so I wrote my own. It's similar to the code we've been running for about a year on Stampsy.com, but rewritten to take advantage of React and Flux.

Key requirements:

* Emit zero DOM or CSS of its own, leaving it to the consuming components;
* Impose as little structure as possible on consuming components;
* Use HTML5 drag and drop as primary backend but make it possible to add different backends in the future;
* Like original HTML5 API, emphasize dragging data and not just “draggable views”;
* Hide [HTML5 API quirks](http://www.quirksmode.org/blog/archives/2009/09/the_html5_drag.html) from the consuming code;
* Different components may be “drag sources” or “drop targets” for different kinds of data;
* Allow one component to contain several drag sources and drop targets when needed;
* Make it easy for drop targets to change their appearance if compatible data is being dragged or hovered;
* Make it easy to use images for drag thumbnails instead of element screenshots, circumventing [browser quirks](http://stackoverflow.com/questions/7340898/html5-setdragimage-only-works-sometimes).

Hopefully the resulting API reflects that.

## Examples

This section is incomplete and will likely change as I work on this library.  
If you want to play with this library, consider helping me [build a sample app for it](https://github.com/gaearon/react-dnd/issues/3).

TODO: examples


## Known Issues

* [Image previews seem to have incorrect offsets on Safari 8](https://github.com/gaearon/react-dnd/issues/1)

## Thanks

This library is a React port of an API, parts of which were originally written by [Andrew Kuznetsov](http://github.com/cavinsmith/).
