"use strict";

function isFirefox() {
  return /firefox/i.test(navigator.userAgent);
}

module.exports = isFirefox;