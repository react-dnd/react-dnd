import without from 'lodash/without'
import { Action } from 'redux-actions'
import {
	BEGIN_DRAG,
	PUBLISH_DRAG_SOURCE,
	HOVER,
	END_DRAG,
	DROP,
} from '../actions/dragDrop'
import { REMOVE_TARGET } from '../actions/registry'

export interface State {
	itemType: string | null
	item: any
	sourceId: string | null
	targetIds: string[]
	dropResult: any
	didDrop: boolean
	isSourcePublic: boolean | null
}

const initialState: State = {
	itemType: null,
	item: null,
	sourceId: null,
	targetIds: [],
	dropResult: null,
	didDrop: false,
	isSourcePublic: null,
}

export default function dragOperation(
	state: State = initialState,
	action: {
		type: string
		itemType: string
		item: any
		sourceId: string
		targetId: string
		targetIds: string[]
		isSourcePublic: boolean
		dropResult: any
	},
) {
	switch (action.type) {
		case BEGIN_DRAG:
			return {
				...state,
				itemType: action.itemType,
				item: action.item,
				sourceId: action.sourceId,
				isSourcePublic: action.isSourcePublic,
				dropResult: null,
				didDrop: false,
			}
		case PUBLISH_DRAG_SOURCE:
			return {
				...state,
				isSourcePublic: true,
			}
		case HOVER:
			return {
				...state,
				targetIds: action.targetIds,
			}
		case REMOVE_TARGET:
			if (state.targetIds.indexOf(action.targetId) === -1) {
				return state
			}
			return {
				...state,
				targetIds: without(state.targetIds, action.targetId),
			}
		case DROP:
			return {
				...state,
				dropResult: action.dropResult,
				didDrop: true,
				targetIds: [],
			}
		case END_DRAG:
			return {
				...state,
				itemType: null,
				item: null,
				sourceId: null,
				dropResult: null,
				didDrop: false,
				isSourcePublic: null,
				targetIds: [],
			}
		default:
			return state
	}
}
