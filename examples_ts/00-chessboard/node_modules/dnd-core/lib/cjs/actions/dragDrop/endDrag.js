"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var invariant = require('invariant');
function createEndDrag(manager) {
    return function endDrag() {
        var monitor = manager.getMonitor();
        var registry = manager.getRegistry();
        verifyIsDragging(monitor);
        var sourceId = monitor.getSourceId();
        var source = registry.getSource(sourceId, true);
        source.endDrag(monitor, sourceId);
        registry.unpinSource();
        return { type: types_1.END_DRAG };
    };
}
exports.default = createEndDrag;
function verifyIsDragging(monitor) {
    invariant(monitor.isDragging(), 'Cannot call endDrag while not dragging.');
}
