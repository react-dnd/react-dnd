import { reduce as dragOffset, State as DragOffsetState } from './dragOffset.js'
import {
	reduce as dragOperation,
	State as DragOperationState,
} from './dragOperation.js'
import { reduce as refCount, State as RefCountState } from './refCount.js'
import {
	reduce as dirtyHandlerIds,
	State as DirtyHandlerIdsState,
} from './dirtyHandlerIds.js'
import { reduce as stateId, State as StateIdState } from './stateId.js'
import { get } from '../utils/js_utils.js'
import type { Action } from '../interfaces.js'

export interface State {
	dirtyHandlerIds: DirtyHandlerIdsState
	dragOffset: DragOffsetState
	refCount: RefCountState
	dragOperation: DragOperationState
	stateId: StateIdState
}

export function reduce(state: State = {} as State, action: Action<any>): State {
	return {
		dirtyHandlerIds: dirtyHandlerIds(state.dirtyHandlerIds, {
			type: action.type,
			payload: {
				...action.payload,
				prevTargetIds: get<string[]>(state, 'dragOperation.targetIds', []),
			},
		}),
		dragOffset: dragOffset(state.dragOffset, action),
		refCount: refCount(state.refCount, action),
		dragOperation: dragOperation(state.dragOperation, action),
		stateId: stateId(state.stateId),
	}
}
