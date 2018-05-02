import { BEGIN_DRAG, HOVER, END_DRAG, DROP } from '../actions/dragDrop'
import { IXYCoord, IAction } from '../interfaces'

export interface IState {
	initialSourceClientOffset: IXYCoord | null
	initialClientOffset: IXYCoord | null
	clientOffset: IXYCoord | null
}

const initialState: IState = {
	initialSourceClientOffset: null,
	initialClientOffset: null,
	clientOffset: null,
}

function areOffsetsEqual(offsetA: IXYCoord | null, offsetB: IXYCoord | null) {
	if (offsetA === offsetB) {
		return true
	}
	return (
		offsetA && offsetB && offsetA.x === offsetB.x && offsetA.y === offsetB.y
	)
}

export default function dragOffset(
	state: IState = initialState,
	action: IAction<{
		sourceClientOffset: IXYCoord
		clientOffset: IXYCoord
	}>,
) {
	const { payload } = action
	switch (action.type) {
		case BEGIN_DRAG:
			return {
				initialSourceClientOffset: payload.sourceClientOffset,
				initialClientOffset: payload.clientOffset,
				clientOffset: payload.clientOffset,
			}
		case HOVER:
			if (areOffsetsEqual(state.clientOffset, payload.clientOffset)) {
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

export function getSourceClientOffset(state: IState) {
	const { clientOffset, initialClientOffset, initialSourceClientOffset } = state
	if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
		return null
	}
	return {
		x: clientOffset.x + initialSourceClientOffset.x - initialClientOffset.x,
		y: clientOffset.y + initialSourceClientOffset.y - initialClientOffset.y,
	}
}

export function getDifferenceFromInitialOffset(state: IState) {
	const { clientOffset, initialClientOffset } = state
	if (!clientOffset || !initialClientOffset) {
		return null
	}
	return {
		x: clientOffset.x - initialClientOffset.x,
		y: clientOffset.y - initialClientOffset.y,
	}
}
