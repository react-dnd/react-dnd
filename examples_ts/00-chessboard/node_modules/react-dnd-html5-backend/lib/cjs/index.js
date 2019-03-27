"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTML5Backend_1 = require("./HTML5Backend");
var getEmptyImage_1 = require("./getEmptyImage");
exports.getEmptyImage = getEmptyImage_1.default;
var NativeTypes = require("./NativeTypes");
exports.NativeTypes = NativeTypes;
function createHTML5Backend(manager) {
    return new HTML5Backend_1.default(manager);
}
exports.default = createHTML5Backend;
