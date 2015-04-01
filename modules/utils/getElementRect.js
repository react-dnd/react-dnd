'use strict';

const ELEMENT_NODE = 1;

function getElementRect(el) {
  if (el.nodeType !== ELEMENT_NODE) {
    el = el.parentElement;
  }

  if (!el) {
    return null;
  }

  var rect = el.getBoundingClientRect();
  // Copy so object doesn't get reused
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

module.exports = getElementRect;
