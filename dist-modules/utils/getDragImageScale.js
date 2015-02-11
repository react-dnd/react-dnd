"use strict";

var isFirefox = require("./isFirefox"),
    isSafari = require("./isSafari");

function getDragImageScale() {
  if (isFirefox() || isSafari()) {
    return window.devicePixelRatio;
  } else {
    return 1;
  }
}

module.exports = getDragImageScale;