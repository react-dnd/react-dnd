"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useMonitorOutput_1 = require("./internal/useMonitorOutput");
var drag_1 = require("./internal/drag");
var react_1 = require("react");
var invariant = require('invariant');
/**
 * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)
 * @param sourceSpec The drag source specification *
 */
function useDrag(spec) {
    var specRef = react_1.useRef(spec);
    // TODO: wire options into createSourceConnector
    invariant(spec.item != null, 'item must be defined');
    invariant(spec.item.type != null, 'item type must be defined');
    var _a = drag_1.useDragSourceMonitor(), monitor = _a[0], connector = _a[1];
    drag_1.useDragHandler(specRef, monitor, connector);
    var result = useMonitorOutput_1.useMonitorOutput(monitor, specRef.current.collect || (function () { return ({}); }), function () { return connector.reconnect(); });
    var connectDragSource = react_1.useMemo(function () { return connector.hooks.dragSource(); }, [
        connector,
    ]);
    var connectDragPreview = react_1.useMemo(function () { return connector.hooks.dragPreview(); }, [
        connector,
    ]);
    react_1.useEffect(function () {
        connector.dragSourceOptions = specRef.current.options || null;
        connector.reconnect();
    }, [connector]);
    react_1.useEffect(function () {
        connector.dragPreviewOptions = specRef.current.previewOptions || null;
        connector.reconnect();
    }, [connector]);
    return [result, connectDragSource, connectDragPreview];
}
exports.useDrag = useDrag;
