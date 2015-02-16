'use strict';

var noop = require('./noop');

var DefaultDropTarget = {
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

module.exports = DefaultDropTarget;