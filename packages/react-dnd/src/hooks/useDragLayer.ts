import { useEffect } from 'react'
import { DragLayerMonitor } from '../interfaces'
import { useDragDropManager } from './useDragDropManager'
import { useCollector } from './useCollector'

export function useDragLayer<CollectedProps>(
	collect: (monitor: DragLayerMonitor) => CollectedProps,
): CollectedProps {
	const dragDropManager = useDragDropManager()
	const monitor = dragDropManager.getMonitor()
	const [value, updateIfNeeded] = useCollector(monitor, collect)

	useEffect(() => monitor.subscribeToOffsetChange(updateIfNeeded))
	useEffect(() => monitor.subscribeToStateChange(updateIfNeeded))
	return value
}
