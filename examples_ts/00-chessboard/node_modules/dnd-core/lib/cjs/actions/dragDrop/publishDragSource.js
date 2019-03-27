"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
function createPublishDragSource(manager) {
    return function publishDragSource() {
        var monitor = manager.getMonitor();
        if (monitor.isDragging()) {
            return { type: types_1.PUBLISH_DRAG_SOURCE };
        }
    };
}
exports.default = createPublishDragSource;
