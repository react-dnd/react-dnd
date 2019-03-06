declare var require: any
import * as React from 'react'
const shallowEqual = require('shallowequal')

export function useCollector<T, S>(
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
