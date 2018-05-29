import xor from 'lodash/xor'
import {
	BEGIN_DRAG,
	PUBLISH_DRAG_SOURCE,
	HOVER,
	END_DRAG,
	DROP,
} from '../actions/dragDrop'
import {
	ADD_SOURCE,
	ADD_TARGET,
	REMOVE_SOURCE,
	REMOVE_TARGET,
} from '../actions/registry'
import { Action } from '../interfaces'
import { areArraysEqual } from '../utils/equality'
import { NONE, ALL } from '../utils/dirtiness'

export type State = string[]

export interface DirtyHandlerIdPayload {
	targetIds: string[]
	prevTargetIds: string[]
}

export default function dirtyHandlerIds(
	state: State = NONE,
	action: Action<DirtyHandlerIdPayload>,
) {
	switch (action.type) {
		case HOVER:
			break
		case ADD_SOURCE:
		case ADD_TARGET:
		case REMOVE_TARGET:
		case REMOVE_SOURCE:
			return NONE
		case BEGIN_DRAG:
		case PUBLISH_DRAG_SOURCE:
		case END_DRAG:
		case DROP:
		default:
			return ALL
	}

	const { targetIds = [], prevTargetIds = [] } = action.payload
	const result = xor(targetIds, prevTargetIds)
	const didChange =
		result.length > 0 || !areArraysEqual(targetIds, prevTargetIds)

	if (!didChange) {
		return NONE
	}

	// Check the target ids at the innermost position. If they are valid, add them
	// to the result
	const prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1]
	const innermostTargetId = targetIds[targetIds.length - 1]
	if (prevInnermostTargetId !== innermostTargetId) {
		if (prevInnermostTargetId) {
			result.push(prevInnermostTargetId)
		}
		if (innermostTargetId) {
			result.push(innermostTargetId)
		}
	}

	return result
}
