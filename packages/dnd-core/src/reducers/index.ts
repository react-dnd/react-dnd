import dragOffset, { IState as DragOffsetState } from './dragOffset'
import dragOperation, { IState as DragOperationState } from './dragOperation'
import refCount, { State as RefCountState } from './refCount'
import dirtyHandlerIds, {
	State as DirtyHandlerIdsState,
} from './dirtyHandlerIds'
import stateId, { State as StateIdState } from './stateId'

export interface IState {
	dirtyHandlerIds: DirtyHandlerIdsState
	dragOffset: DragOffsetState
	refCount: RefCountState
	dragOperation: DragOperationState
	stateId: StateIdState
}

export default function reduce(state: IState = {} as IState, action: any) {
	return {
		dirtyHandlerIds: dirtyHandlerIds(
			state.dirtyHandlerIds,
			action,
			state.dragOperation,
		),
		dragOffset: dragOffset(state.dragOffset, action),
		refCount: refCount(state.refCount, action),
		dragOperation: dragOperation(state.dragOperation, action),
		stateId: stateId(state.stateId),
	}
}
