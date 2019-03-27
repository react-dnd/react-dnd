"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


const scroll = (size, { offset, max }) => {
  let start = 0;
  let index = Math.min(offset, size);

  const halfScreen = max / 2;

  if (index <= halfScreen) {
    start = 0;
  } else {
    if (size >= max) {
      start = Math.min(index - halfScreen - 1, size - max);
    }
    index = Math.min(index - start, size);
  }

  return {
    end: Math.min(size, start + max),
    index,
    start
  };
};

exports.default = scroll;