"use strict";

var PropTypes = require("react").PropTypes;
var DragDropManager = require("dnd-core").DragDropManager;


/**
 * We shouldn't need this in React 0.14.
 * For now, I need something working!
 */
module.exports = function (backends) {
  var keys = Object.keys(backends);

  var context = {};
  var childContextTypes = {};

  keys.forEach(function (key) {
    childContextTypes[key] = PropTypes.object.isRequired;
    context[key] = new DragDropManager(backends[key]);
  });

  return {
    childContextTypes: childContextTypes,

    getChildContext: function getChildContext() {
      return context;
    }
  };
};