import {
	INIT_COORDS,
	BEGIN_DRAG,
	HOVER,
	END_DRAG,
	DROP,
	INIT_CLIENT_OFFSET,
} from '../actions/dragDrop'
import { XYCoord, Action } from '../interfaces'
import { areCoordsEqual } from '../utils/equality'

export interface State {
	initialSourceClientOffset: XYCoord | null
	initialClientOffset: XYCoord | null
	clientOffset: XYCoord | null
}

const initialState: State = {
	initialSourceClientOffset: null,
	initialClientOffset: null,
	clientOffset: null,
}

export default function dragOffset(
	state: State = initialState,
	action: Action<{
		sourceClientOffset: XYCoord
		clientOffset: XYCoord
	}>,
) {
	const { payload } = action
	switch (action.type) {
		case INIT_CLIENT_OFFSET:
			return {
				...state,
				clientOffset: payload.clientOffset,
				initialClientOffset: payload.clientOffset,
			}
		case INIT_COORDS:
		case BEGIN_DRAG:
			return {
				initialSourceClientOffset: payload.sourceClientOffset,
				initialClientOffset: payload.clientOffset,
				clientOffset: payload.clientOffset,
			}
		case HOVER:
			if (areCoordsEqual(state.clientOffset, payload.clientOffset)) {
				return state
			}
			return {
				...state,
				clientOffset: payload.clientOffset,
			}
		case END_DRAG:
		case DROP:
			return initialState
		default:
			return state
	}
}
