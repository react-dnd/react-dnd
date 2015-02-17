"use strict";

var noop = require("lodash/utility/noop");

var LegacyDefaultDropTarget = {
  canDrop: function canDrop() {
    return true;
  },

  getDropEffect: function getDropEffect(allowedEffects) {
    return allowedEffects[0];
  },

  enter: noop,
  over: noop,
  leave: noop,
  acceptDrop: noop
};

module.exports = LegacyDefaultDropTarget;