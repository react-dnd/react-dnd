'use strict';

var noop = require('lodash/utility/noop');

var LegacyDefaultDropTarget = {
  canDrop() {
    return true;
  },

  getDropEffect(allowedEffects) {
    return allowedEffects[0];
  },

  enter: noop,
  over: noop,
  leave: noop,
  acceptDrop: noop
};

module.exports = LegacyDefaultDropTarget;