"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var beginDrag_1 = require("./beginDrag");
var publishDragSource_1 = require("./publishDragSource");
var hover_1 = require("./hover");
var drop_1 = require("./drop");
var endDrag_1 = require("./endDrag");
__export(require("./types"));
function createDragDropActions(manager) {
    return {
        beginDrag: beginDrag_1.default(manager),
        publishDragSource: publishDragSource_1.default(manager),
        hover: hover_1.default(manager),
        drop: drop_1.default(manager),
        endDrag: endDrag_1.default(manager),
    };
}
exports.default = createDragDropActions;
