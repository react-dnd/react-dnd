"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useMonitorOutput_1 = require("./internal/useMonitorOutput");
var drop_1 = require("./internal/drop");
var react_1 = require("react");
var invariant = require('invariant');
/**
 * useDropTarget Hook (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param spec The drop target specification
 */
function useDrop(spec) {
    var specRef = react_1.useRef(spec);
    invariant(spec.accept != null, 'accept must be defined');
    var _a = drop_1.useDropTargetMonitor(), monitor = _a[0], connector = _a[1];
    drop_1.useDropHandler(specRef, monitor, connector);
    var result = useMonitorOutput_1.useMonitorOutput(monitor, specRef.current.collect || (function () { return ({}); }), function () { return connector.reconnect(); });
    var connectDropTarget = react_1.useMemo(function () { return connector.hooks.dropTarget(); }, [
        connector,
    ]);
    react_1.useEffect(function () {
        connector.dropTargetOptions = spec.options || null;
        connector.reconnect();
    }, [spec.options]);
    return [result, connectDropTarget];
}
exports.useDrop = useDrop;
