import {
	ADD_SOURCE,
	ADD_TARGET,
	REMOVE_SOURCE,
	REMOVE_TARGET,
} from '../actions/registry'
import type { Action } from '../interfaces'

export type State = number

export function reduce(state: State = 0, action: Action<any>): State {
	switch (action.type) {
		case ADD_SOURCE:
		case ADD_TARGET:
			return state + 1
		case REMOVE_SOURCE:
		case REMOVE_TARGET:
			return state - 1
		default:
			return state
	}
}
