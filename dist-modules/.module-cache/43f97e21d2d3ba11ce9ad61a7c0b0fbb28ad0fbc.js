'use strict';

var DropEffects = require('../constants/DropEffects');

function getBrowserEffectAllowed(effectsAllowed) {
  var allowCopy = effectsAllowed.indexOf(DropEffects.COPY) > -1,
      allowMove = effectsAllowed.indexOf(DropEffects.MOVE) > -1,
      allowLink = effectsAllowed.indexOf(DropEffects.LINK) > -1;

  if (allowCopy && allowMove && allowLink) {
    return 'all';
  } else if (allowCopy && allowMove) {
    return 'copyMove';
  } else if (allowLink && allowMove) {
    return 'linkMove';
  } else if (allowCopy && allowLink) {
    return 'copyLink';
  } else if (allowCopy) {
    return 'copy';
  } else if (allowMove) {
    return 'move';
  } else if (allowLink) {
    return 'link';
  } else {
    return 'none';
  }
}

module.exports = getBrowserEffectAllowed;