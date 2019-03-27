import { useEffect, useMemo } from 'react';
import registerSource from '../../registerSource';
import { useDragDropManager } from './useDragDropManager';
import DragSourceMonitorImpl from '../../DragSourceMonitorImpl';
import SourceConnector from '../../SourceConnector';
const invariant = require('invariant');
export function useDragSourceMonitor() {
    const manager = useDragDropManager();
    const monitor = useMemo(() => new DragSourceMonitorImpl(manager), [manager]);
    const connector = useMemo(() => new SourceConnector(manager.getBackend()), [
        manager,
    ]);
    return [monitor, connector];
}
export function useDragHandler(spec, monitor, connector) {
    const manager = useDragDropManager();
    // Can't use createSourceFactory, as semantics are different
    const handler = useMemo(() => {
        return {
            beginDrag() {
                const { begin, item } = spec.current;
                if (begin) {
                    const beginResult = begin(monitor);
                    invariant(beginResult == null || typeof beginResult === 'object', 'dragSpec.begin() must either return an object, undefined, or null');
                    return beginResult || item || {};
                }
                return item || {};
            },
            canDrag() {
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
            isDragging(globalMonitor, target) {
                const { isDragging } = spec.current;
                return isDragging
                    ? isDragging(monitor)
                    : target === globalMonitor.getSourceId();
            },
            endDrag() {
                const { end } = spec.current;
                if (end) {
                    end(monitor.getItem(), monitor);
                }
                connector.reconnect();
            },
        };
    }, []);
    useEffect(function registerHandler() {
        // console.log('Register Handler')
        const [handlerId, unregister] = registerSource(spec.current.item.type, handler, manager);
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, []);
}
