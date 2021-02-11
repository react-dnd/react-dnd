import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';
import { useCollector } from './useCollector';
export function useMonitorOutput(monitor, collect, onCollect) {
    const [collected, updateCollected] = useCollector(monitor, collect, onCollect);
    useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
        const handlerId = monitor.getHandlerId();
        if (handlerId == null) {
            return undefined;
        }
        return monitor.subscribeToStateChange(updateCollected, {
            handlerIds: [handlerId],
        });
    }, [monitor, updateCollected]);
    return collected;
}
//# sourceMappingURL=useMonitorOutput.js.map