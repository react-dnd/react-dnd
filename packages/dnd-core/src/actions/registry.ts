import { IAction, ISourceIdPayload, ITargetIdPayload } from '../interfaces'

export const ADD_SOURCE = 'dnd-core/ADD_SOURCE'
export const ADD_TARGET = 'dnd-core/ADD_TARGET'
export const REMOVE_SOURCE = 'dnd-core/REMOVE_SOURCE'
export const REMOVE_TARGET = 'dnd-core/REMOVE_TARGET'

export function addSource(sourceId: string): IAction<ISourceIdPayload> {
	return {
		type: ADD_SOURCE,
		payload: {
			sourceId,
		},
	}
}

export function addTarget(targetId: string): IAction<ITargetIdPayload> {
	return {
		type: ADD_TARGET,
		payload: {
			targetId,
		},
	}
}

export function removeSource(sourceId: string): IAction<ISourceIdPayload> {
	return {
		type: REMOVE_SOURCE,
		payload: {
			sourceId,
		},
	}
}

export function removeTarget(targetId: string): IAction<ITargetIdPayload> {
	return {
		type: REMOVE_TARGET,
		payload: {
			targetId,
		},
	}
}
