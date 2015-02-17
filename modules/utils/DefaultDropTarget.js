'use strict';

var noop = require('lodash/utility/noop');

var DefaultDropTarget = {
  canDrop() {
    return true;
  },

  getDropEffect(component, allowedEffects) {
    return allowedEffects[0];
  },

  enter: noop,
  over: noop,
  leave: noop,
  acceptDrop: noop
};

module.exports = DefaultDropTarget;