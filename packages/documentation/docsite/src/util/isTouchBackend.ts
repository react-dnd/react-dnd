import { parse } from 'query-string'

export function isTouchBackend() {
	if (typeof window !== 'undefined') {
		const queryObject = parse(window.location.search)
		return (
			queryObject.touch !== undefined ||
			localStorage.REACT_DND_TOUCH_BACKEND === 'true'
		)
	} else {
		return false
	}
}
