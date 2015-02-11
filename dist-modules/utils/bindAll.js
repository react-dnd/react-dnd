"use strict";

function bindAll(obj, context) {
  if (!context) {
    context = obj;
  }

  for (var key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === "function") {
      obj[key] = obj[key].bind(context);
    }
  }

  return obj;
}

module.exports = bindAll;