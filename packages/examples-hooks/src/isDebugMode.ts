import { parse } from 'query-string'

export function isDebugMode() {
	if (typeof window !== 'undefined') {
		const queryObject = parse(window.location.search)
		return queryObject.debugMode !== undefined
	} else {
		return false
	}
}
