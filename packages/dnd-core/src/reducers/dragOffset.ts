import { BEGIN_DRAG, HOVER, END_DRAG, DROP } from '../actions/dragDrop'
import { XYCoord } from '../interfaces'

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

function areOffsetsEqual(offsetA: XYCoord | null, offsetB: XYCoord | null) {
	if (offsetA === offsetB) {
		return true
	}
	return (
		offsetA && offsetB && offsetA.x === offsetB.x && offsetA.y === offsetB.y
	)
}

export default function dragOffset(
	state: State = initialState,
	action: { type: string; sourceClientOffset: XYCoord; clientOffset: XYCoord },
) {
	switch (action.type) {
		case BEGIN_DRAG:
			return {
				initialSourceClientOffset: action.sourceClientOffset,
				initialClientOffset: action.clientOffset,
				clientOffset: action.clientOffset,
			}
		case HOVER:
			if (areOffsetsEqual(state.clientOffset, action.clientOffset)) {
				return state
			}
			return {
				...state,
				clientOffset: action.clientOffset,
			}
		case END_DRAG:
		case DROP:
			return initialState
		default:
			return state
	}
}

export function getSourceClientOffset(state: State) {
	const { clientOffset, initialClientOffset, initialSourceClientOffset } = state
	if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
		return null
	}
	return {
		x: clientOffset.x + initialSourceClientOffset.x - initialClientOffset.x,
		y: clientOffset.y + initialSourceClientOffset.y - initialClientOffset.y,
	}
}

export function getDifferenceFromInitialOffset(state: State) {
	const { clientOffset, initialClientOffset } = state
	if (!clientOffset || !initialClientOffset) {
		return null
	}
	return {
		x: clientOffset.x - initialClientOffset.x,
		y: clientOffset.y - initialClientOffset.y,
	}
}
