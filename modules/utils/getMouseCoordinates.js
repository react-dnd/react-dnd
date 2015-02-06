'use strict';

function getMouseCoordinates(e) {
  return {
    x: e.pageX || e.clientX + window.pageXOffset || document.documentElement.scrollLeft,
    y: e.pageY || e.clientY + window.pageYOffset || document.documentElement.scrollTop
  };
}

module.exports = getMouseCoordinates;