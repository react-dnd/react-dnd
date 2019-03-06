declare var require: any

import * as React from 'react'
import { DragLayerMonitor } from '../interfaces'
import { useDragDropManager } from './util'
const shallowEqual = require('shallowequal')

function useCollector<T, S>(
	monitor: T,
	collect: (monitor: T) => S,
): [S, () => void] {
	let isFirstRender = false
	const [value, setValue] = React.useState(() => {
		isFirstRender = true
		return collect(monitor)
	})

	const updateIfNeeded = () => {
		const nextValue = collect(monitor)
		// Not async-safe, but we need a way to opt-out of state updates
		if (!shallowEqual(value, nextValue)) {
			setValue(nextValue)
		}
	}

	if (!isFirstRender) {
		updateIfNeeded()
	}

	return [value, updateIfNeeded]
}

export function useMonitorOutput<Output = {}>(
	monitor: any,
	collect: (monitor: any) => Output,
): Output {
	const [value, updateIfNeeded] = useCollector(monitor, collect)

	// This runs on every render. There will be ways to optimise this, but for
	// now, this is the most correct thing to do.
	React.useEffect(() => {
		const handlerId = monitor.getHandlerId()
		if (handlerId == null) {
			return undefined
		}
		const options = { handlerIds: [handlerId] }
		return (monitor as any).subscribeToStateChange(updateIfNeeded, options)
	})

	return value
}

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
