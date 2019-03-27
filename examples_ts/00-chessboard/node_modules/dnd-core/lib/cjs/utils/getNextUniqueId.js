"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nextUniqueId = 0;
function getNextUniqueId() {
    return nextUniqueId++;
}
exports.default = getNextUniqueId;
