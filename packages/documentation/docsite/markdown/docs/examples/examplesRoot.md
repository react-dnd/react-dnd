---
path: '/examples'
title: 'Examples'
---

## About

The examples here perform a lot of jobs:

- They are instructive about common patterns to use with React-DnD.
- They showcase various aspects of the API to demonstrate the flexibility of the library.
- They act as a set of integration test cases.

If you use a pattern that is not covered here, please consider submitting a Pull Request to add it to this list.

## Flags

For these examples, the following flags are available. To enable them add them to the end of your URL.

- `?debug` - Enables **debug mode** of `dnd-core`. This registers `dnd-core` with the [Redux Devtools Chrome extension](https://github.com/zalmoxisus/redux-devtools-extension).

## Running Locally

To run these examples locally, clone the `react-dnd` repository, and run

```
> yarn install
> yarn build
> yarn start
```

It will take a while to start, but after the site is built, you can access the examples by opening [http://localhost:8000/](http://localhost:8000/) and clicking “Examples” in the navigation bar.
