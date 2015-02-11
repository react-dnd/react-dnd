"use strict";

var invariant = require("react/lib/invariant");

var MemoizeBindMixin = {
  memoizeBind: function memoizeBind(name, argument, hasher) {
    var key = hasher ? hasher(argument) : argument;
    invariant(typeof key === "string", "Expected memoization key to be a string, got %s", argument);

    if (!this.__cachedBoundMethods) {
      this.__cachedBoundMethods = {};
    }

    if (!this.__cachedBoundMethods[name]) {
      this.__cachedBoundMethods[name] = {};
    }

    if (!this.__cachedBoundMethods[name][key]) {
      this.__cachedBoundMethods[name][key] = this[name].bind(this, argument);
    }

    return this.__cachedBoundMethods[name][key];
  },

  componentWillUnmount: function componentWillUnmount() {
    this.__cachedBoundMethods = {};
  }
};

module.exports = MemoizeBindMixin;