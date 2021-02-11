import { useRef, useMemo } from 'react';
import { invariant } from '@react-dnd/invariant';
import { useMonitorOutput } from './internal/useMonitorOutput';
import { useIsomorphicLayoutEffect } from './internal/useIsomorphicLayoutEffect';
import { useDropHandler, useDropTargetMonitor } from './internal/drop';
/**
 * useDropTarget Hook
 * @param spec The drop target specification
 */
export function useDrop(spec) {
    const specRef = useRef(spec);
    specRef.current = spec;
    invariant(spec.accept != null, 'accept must be defined');
    const [monitor, connector] = useDropTargetMonitor();
    useDropHandler(specRef, monitor, connector);
    const result = useMonitorOutput(monitor, specRef.current.collect || (() => ({})), () => connector.reconnect());
    const connectDropTarget = useMemo(() => connector.hooks.dropTarget(), [
        connector,
    ]);
    useIsomorphicLayoutEffect(() => {
        connector.dropTargetOptions = spec.options || null;
        connector.reconnect();
    }, [spec.options]);
    return [result, connectDropTarget];
}
//# sourceMappingURL=useDrop.js.map