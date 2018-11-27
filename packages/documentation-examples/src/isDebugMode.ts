import { parse } from 'query-string'

export function isDebugMode() {
	const queryObject = parse(window.location.search)
	return queryObject.debugMode !== undefined
}
