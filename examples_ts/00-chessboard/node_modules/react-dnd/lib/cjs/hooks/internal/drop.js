"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var registerTarget_1 = require("../../registerTarget");
var useDragDropManager_1 = require("./useDragDropManager");
var TargetConnector_1 = require("../../TargetConnector");
var DropTargetMonitorImpl_1 = require("../../DropTargetMonitorImpl");
function useDropTargetMonitor() {
    var manager = useDragDropManager_1.useDragDropManager();
    var monitor = react_1.useMemo(function () { return new DropTargetMonitorImpl_1.default(manager); }, [manager]);
    var connector = react_1.useMemo(function () { return new TargetConnector_1.default(manager.getBackend()); }, [
        manager,
    ]);
    return [monitor, connector];
}
exports.useDropTargetMonitor = useDropTargetMonitor;
function useDropHandler(spec, monitor, connector) {
    var manager = useDragDropManager_1.useDragDropManager();
    // Can't use createSourceFactory, as semantics are different
    var handler = react_1.useMemo(function () {
        // console.log('create drop target handler')
        return {
            canDrop: function () {
                var canDrop = spec.current.canDrop;
                return canDrop ? canDrop(monitor.getItem(), monitor) : true;
            },
            hover: function () {
                var hover = spec.current.hover;
                if (hover) {
                    hover(monitor.getItem(), monitor);
                }
            },
            drop: function () {
                var drop = spec.current.drop;
                if (drop) {
                    return drop(monitor.getItem(), monitor);
                }
            },
        };
    }, [monitor]);
    react_1.useEffect(function registerHandler() {
        // console.log('register droptarget handler')
        var _a = registerTarget_1.default(spec.current.accept, handler, manager), handlerId = _a[0], unregister = _a[1];
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, [monitor, connector]);
}
exports.useDropHandler = useDropHandler;
