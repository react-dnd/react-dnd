"use strict";

module.exports = joinRefs;
function joinRefs(refA, refB) {
  return function (instance) {
    refA(instance);
    refB(instance);
  };
}