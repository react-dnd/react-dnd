import shallowEqual from 'shallowequal'

export default function areOptionsEqual(nextOptions, currentOptions) {
	if (currentOptions === nextOptions) {
		return true
	}

	return (
		currentOptions !== null &&
		nextOptions !== null &&
		shallowEqual(currentOptions, nextOptions)
	)
}
