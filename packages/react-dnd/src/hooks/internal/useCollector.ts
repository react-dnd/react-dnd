declare var require: any
import { useState } from 'react'
import { Connector } from 'react-dnd/SourceConnector'
const shallowEqual = require('shallowequal')

export function useCollector<T, S>(
	monitor: T,
	collect: (monitor: T) => S,
	connector?: Connector,
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
