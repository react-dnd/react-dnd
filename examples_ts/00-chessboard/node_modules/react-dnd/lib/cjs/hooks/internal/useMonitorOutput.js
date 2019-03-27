"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useCollector_1 = require("./useCollector");
function useMonitorOutput(monitor, collect, onCollect) {
    var _a = useCollector_1.useCollector(monitor, collect, onCollect), collected = _a[0], updateCollected = _a[1];
    react_1.useEffect(function subscribeToMonitorStateChange() {
        var handlerId = monitor.getHandlerId();
        if (handlerId == null) {
            return undefined;
        }
        var unsubscribe = monitor.subscribeToStateChange(updateCollected, {
            handlerIds: [handlerId],
        });
        return unsubscribe;
    }, [monitor]);
    return collected;
}
exports.useMonitorOutput = useMonitorOutput;
