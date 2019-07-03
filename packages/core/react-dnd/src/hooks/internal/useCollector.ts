import shallowEqual from 'shallowequal'
import { useState, useCallback, useLayoutEffect } from 'react'

/**
 *
 * @param monitor The monitor to collect state from
 * @param collect The collecting function
 * @param onUpdate A method to invoke when updates occur
 */
export function useCollector<T, S>(
	monitor: T,
	collect: (monitor: T) => S,
	onUpdate?: () => void,
): [S, () => void] {
	const [collected, setCollected] = useState(() => collect(monitor))

	const updateCollected = useCallback(() => {
		const nextValue = collect(monitor)
		if (!shallowEqual(collected, nextValue)) {
			setCollected(nextValue)
			if (onUpdate) {
				onUpdate()
			}
		}
	}, [collected, monitor, onUpdate])

	// update the collected properties after the first render
	// and the components are attached to dnd-core
	useLayoutEffect(updateCollected, [])

	return [collected, updateCollected]
}
