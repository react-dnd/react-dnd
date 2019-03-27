"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var registerSource_1 = require("../../registerSource");
var useDragDropManager_1 = require("./useDragDropManager");
var DragSourceMonitorImpl_1 = require("../../DragSourceMonitorImpl");
var SourceConnector_1 = require("../../SourceConnector");
var invariant = require('invariant');
function useDragSourceMonitor() {
    var manager = useDragDropManager_1.useDragDropManager();
    var monitor = react_1.useMemo(function () { return new DragSourceMonitorImpl_1.default(manager); }, [manager]);
    var connector = react_1.useMemo(function () { return new SourceConnector_1.default(manager.getBackend()); }, [
        manager,
    ]);
    return [monitor, connector];
}
exports.useDragSourceMonitor = useDragSourceMonitor;
function useDragHandler(spec, monitor, connector) {
    var manager = useDragDropManager_1.useDragDropManager();
    // Can't use createSourceFactory, as semantics are different
    var handler = react_1.useMemo(function () {
        return {
            beginDrag: function () {
                var _a = spec.current, begin = _a.begin, item = _a.item;
                if (begin) {
                    var beginResult = begin(monitor);
                    invariant(beginResult == null || typeof beginResult === 'object', 'dragSpec.begin() must either return an object, undefined, or null');
                    return beginResult || item || {};
                }
                return item || {};
            },
            canDrag: function () {
                if (typeof spec.current.canDrag === 'boolean') {
                    return spec.current.canDrag;
                }
                else if (typeof spec.current.canDrag === 'function') {
                    return spec.current.canDrag(monitor);
                }
                else {
                    return true;
                }
            },
            isDragging: function (globalMonitor, target) {
                var isDragging = spec.current.isDragging;
                return isDragging
                    ? isDragging(monitor)
                    : target === globalMonitor.getSourceId();
            },
            endDrag: function () {
                var end = spec.current.end;
                if (end) {
                    end(monitor.getItem(), monitor);
                }
                connector.reconnect();
            },
        };
    }, []);
    react_1.useEffect(function registerHandler() {
        // console.log('Register Handler')
        var _a = registerSource_1.default(spec.current.item.type, handler, manager), handlerId = _a[0], unregister = _a[1];
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, []);
}
exports.useDragHandler = useDragHandler;
