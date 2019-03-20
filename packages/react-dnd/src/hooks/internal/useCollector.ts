import { useState } from 'react'
import { Connector } from '../../SourceConnector'

export function useCollector<T, S>(
	monitor: T,
	collect: (monitor: T) => S,
	connector?: Connector,
): [S, () => void] {
	const [collected, setCollected] = useState(() => collect(monitor))

	const updateCollected = () => {
		const nextValue = collect(monitor)
		setCollected(nextValue)
		if (connector) {
			connector.reconnect()
		}
		// if (!shallowEqual(collected, nextValue)) {
		// 	console.log('collected props changed')

		// }
	}

	return [collected, updateCollected]
}
