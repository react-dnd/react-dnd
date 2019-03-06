import * as React from 'react'
import { DragLayerMonitor } from '../interfaces'
import { useDragDropManager } from './useDragDropManager'
import { useCollector } from './useCollector'

export function useDragLayerOutput<Output = {}>(
	collect: (monitor: DragLayerMonitor) => Output,
): Output {
	const dragDropManager = useDragDropManager()
	const monitor = dragDropManager.getMonitor()
	const [value, updateIfNeeded] = useCollector(monitor, collect)

	React.useEffect(() => monitor.subscribeToOffsetChange(updateIfNeeded))
	React.useEffect(() => monitor.subscribeToStateChange(updateIfNeeded))
	return value
}
