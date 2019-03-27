import { useMonitorOutput } from './internal/useMonitorOutput';
import { useDragSourceMonitor, useDragHandler } from './internal/drag';
import { useEffect, useRef, useMemo } from 'react';
const invariant = require('invariant');
/**
 * useDragSource hook (This API is experimental and subject to breaking changes in non-major versions)
 * @param sourceSpec The drag source specification *
 */
export function useDrag(spec) {
    const specRef = useRef(spec);
    // TODO: wire options into createSourceConnector
    invariant(spec.item != null, 'item must be defined');
    invariant(spec.item.type != null, 'item type must be defined');
    const [monitor, connector] = useDragSourceMonitor();
    useDragHandler(specRef, monitor, connector);
    const result = useMonitorOutput(monitor, specRef.current.collect || (() => ({})), () => connector.reconnect());
    const connectDragSource = useMemo(() => connector.hooks.dragSource(), [
        connector,
    ]);
    const connectDragPreview = useMemo(() => connector.hooks.dragPreview(), [
        connector,
    ]);
    useEffect(() => {
        connector.dragSourceOptions = specRef.current.options || null;
        connector.reconnect();
    }, [connector]);
    useEffect(() => {
        connector.dragPreviewOptions = specRef.current.previewOptions || null;
        connector.reconnect();
    }, [connector]);
    return [result, connectDragSource, connectDragPreview];
}
