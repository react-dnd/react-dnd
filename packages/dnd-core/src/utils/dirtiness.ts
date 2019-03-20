declare var require: any

const intersection = require('lodash/intersection')

export const NONE: string[] = ['__NONE__']
export const ALL: string[] = ['__ALL__']

/**
 * Determines if the given handler IDs are dirty or not.
 *
 * @param dirtyIds The set of dirty handler ids
 * @param handlerIds The set of handler ids to check
 */
export function areDirty(
	dirtyIds: string[],
	handlerIds: string[] | undefined,
): boolean {
	if (dirtyIds === NONE) {
		return false
	}

	if (dirtyIds === ALL || typeof handlerIds === 'undefined') {
		return true
	}

	const commonIds = intersection(handlerIds, dirtyIds)
	return commonIds.length > 0
}
