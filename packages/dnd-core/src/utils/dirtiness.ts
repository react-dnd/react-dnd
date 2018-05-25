import intersection from 'lodash/intersection'

export const NONE: string[] = []
export const ALL: string[] = []

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

	return intersection(handlerIds, dirtyIds).length > 0
}
