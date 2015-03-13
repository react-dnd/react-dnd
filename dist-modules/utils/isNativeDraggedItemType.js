"use strict";

var NativeDragItemTypes = require("../constants/NativeDragItemTypes");

function isNativeDraggedItemType(itemType) {
  switch (itemType) {
    case NativeDragItemTypes.FILE:
    case NativeDragItemTypes.URL:
      return true;
    default:
      return false;
  }
}

module.exports = isNativeDraggedItemType;