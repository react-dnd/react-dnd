import { useEffect } from 'react';
import { useDragDropManager } from './internal/useDragDropManager';
import { useCollector } from './internal/useCollector';
/**
 * useDragLayer Hook  (This API is experimental and subject to breaking changes in non-breaking versions)
 * @param collector The property collector
 */
export function useDragLayer(collect) {
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();
    const [collected, updateCollected] = useCollector(monitor, collect);
    useEffect(() => monitor.subscribeToOffsetChange(updateCollected));
    useEffect(() => monitor.subscribeToStateChange(updateCollected));
    return collected;
}
