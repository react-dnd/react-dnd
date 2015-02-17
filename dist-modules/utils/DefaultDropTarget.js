"use strict";

var noop = require("lodash/utility/noop");

var DefaultDropTarget = {
  canDrop: function canDrop() {
    return true;
  },

  getDropEffect: function getDropEffect(component, allowedEffects) {
    return allowedEffects[0];
  },

  enter: noop,
  over: noop,
  leave: noop,
  acceptDrop: noop
};

module.exports = DefaultDropTarget;