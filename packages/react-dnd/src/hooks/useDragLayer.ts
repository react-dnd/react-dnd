import { useEffect } from 'react'
import { DragLayerMonitor } from 'react-dnd'
import { useDragDropManager } from './useDragDropManager'
import { useCollector } from './useCollector'

/**
 * useDragLayer Hook
 * @param collector The property collector
 */
export function useDragLayer<CollectedProps>(
	collect: (monitor: DragLayerMonitor) => CollectedProps,
): CollectedProps {
	const dragDropManager = useDragDropManager()
	const monitor = dragDropManager.getMonitor()
	const [collected, updateCollected] = useCollector(monitor, collect)

	useEffect(() => monitor.subscribeToOffsetChange(updateCollected))
	useEffect(() => monitor.subscribeToStateChange(updateCollected))
	return collected
}
