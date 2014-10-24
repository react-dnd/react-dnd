'use strict';

function isWebkit() {
  return 'WebkitAppearance' in document.documentElement.style;
}

module.exports = isWebkit;