"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useDragDropManager_1 = require("./internal/useDragDropManager");
var useCollector_1 = require("./internal/useCollector");
/**
 * useDragLayer Hook  (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param collector The property collector
 */
function useDragLayer(collect) {
    var dragDropManager = useDragDropManager_1.useDragDropManager();
    var monitor = dragDropManager.getMonitor();
    var _a = useCollector_1.useCollector(monitor, collect), collected = _a[0], updateCollected = _a[1];
    react_1.useEffect(function () { return monitor.subscribeToOffsetChange(updateCollected); });
    react_1.useEffect(function () { return monitor.subscribeToStateChange(updateCollected); });
    return collected;
}
exports.useDragLayer = useDragLayer;
