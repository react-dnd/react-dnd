import { useMemo } from 'react';
import { registerTarget } from '../../common/registration';
import { useDragDropManager } from '../useDragDropManager';
import { TargetConnector } from '../../common/TargetConnector';
import { DropTargetMonitorImpl } from '../../common/DropTargetMonitorImpl';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
export function useDropTargetMonitor() {
    const manager = useDragDropManager();
    const monitor = useMemo(() => new DropTargetMonitorImpl(manager), [manager]);
    const connector = useMemo(() => new TargetConnector(manager.getBackend()), [
        manager,
    ]);
    return [monitor, connector];
}
export function useDropHandler(spec, monitor, connector) {
    const manager = useDragDropManager();
    const handler = useMemo(() => {
        return {
            canDrop() {
                const { canDrop } = spec.current;
                return canDrop ? canDrop(monitor.getItem(), monitor) : true;
            },
            hover() {
                const { hover } = spec.current;
                if (hover) {
                    hover(monitor.getItem(), monitor);
                }
            },
            drop() {
                const { drop } = spec.current;
                if (drop) {
                    return drop(monitor.getItem(), monitor);
                }
            },
        };
    }, [monitor]);
    useIsomorphicLayoutEffect(function registerHandler() {
        const [handlerId, unregister] = registerTarget(spec.current.accept, handler, manager);
        monitor.receiveHandlerId(handlerId);
        connector.receiveHandlerId(handlerId);
        return unregister;
    }, [monitor, connector, spec.current.accept]);
}
//# sourceMappingURL=drop.js.map