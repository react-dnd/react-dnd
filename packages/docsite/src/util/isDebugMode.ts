import { parse } from 'query-string'

export function isDebugMode(): boolean {
	if (typeof window !== 'undefined') {
		const queryObject = parse(window.location.search)
		return (
			queryObject.debug !== undefined || localStorage.REACT_DND_DEBUG === 'true'
		)
	} else {
		return false
	}
}
