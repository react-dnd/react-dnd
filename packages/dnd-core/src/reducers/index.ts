import { reduce as dragOffset, State as DragOffsetState } from './dragOffset'
import {
	reduce as dragOperation,
	State as DragOperationState,
} from './dragOperation'
import { reduce as refCount, State as RefCountState } from './refCount'
import {
	reduce as dirtyHandlerIds,
	State as DirtyHandlerIdsState,
} from './dirtyHandlerIds'
import { reduce as stateId, State as StateIdState } from './stateId'
import { get } from '../utils/js_utils'
import type { Action } from '../interfaces'

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
