declare var require: any
import { useState } from 'react'
const shallowEqual = require('shallowequal')

export function useCollector<T, S>(
	monitor: T,
	connector: any,
	collect: (monitor: T) => S,
): [S, () => void] {
	const [collected, setCollected] = useState(() => collect(monitor))

	const updateCollected = () => {
		const nextValue = collect(monitor)
		if (!shallowEqual(collected, nextValue)) {
			setCollected(nextValue)
			if (connector) {
				connector.reconnect()
			}
		}
	}

	return [collected, updateCollected]
}
