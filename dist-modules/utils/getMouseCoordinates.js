"use strict";

function getMouseCoordinates(e) {
  return {
    x: "pageX" in e ? e.pageX : e.clientX + (window.pageXOffset || document.documentElement.scrollLeft),
    y: "pageY" in e ? e.pageY : e.clientY + (window.pageYOffset || document.documentElement.scrollTop)
  };
}

module.exports = getMouseCoordinates;