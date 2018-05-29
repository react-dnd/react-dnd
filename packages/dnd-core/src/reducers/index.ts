import get from 'lodash/get'
import dragOffset, { State as DragOffsetState } from './dragOffset'
import dragOperation, { State as DragOperationState } from './dragOperation'
import refCount, { State as RefCountState } from './refCount'
import dirtyHandlerIds, {
	State as DirtyHandlerIdsState,
} from './dirtyHandlerIds'
import stateId, { State as StateIdState } from './stateId'

export interface State {
	dirtyHandlerIds: DirtyHandlerIdsState
	dragOffset: DragOffsetState
	refCount: RefCountState
	dragOperation: DragOperationState
	stateId: StateIdState
}

export default function reduce(state: State = {} as State, action: any) {
	return {
		dirtyHandlerIds: dirtyHandlerIds(state.dirtyHandlerIds, {
			type: action.type,
			payload: {
				...action.payload,
				prevTargetIds: get(state, 'dragOperation.targetIds', []),
			},
		}),
		dragOffset: dragOffset(state.dragOffset, action),
		refCount: refCount(state.refCount, action),
		dragOperation: dragOperation(state.dragOperation, action),
		stateId: stateId(state.stateId),
	}
}
