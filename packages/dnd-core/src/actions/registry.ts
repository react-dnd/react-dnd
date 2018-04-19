export const ADD_SOURCE = 'dnd-core/ADD_SOURCE'
export const ADD_TARGET = 'dnd-core/ADD_TARGET'
export const REMOVE_SOURCE = 'dnd-core/REMOVE_SOURCE'
export const REMOVE_TARGET = 'dnd-core/REMOVE_TARGET'

export function addSource(sourceId: string) {
	return {
		type: ADD_SOURCE,
		sourceId,
	}
}

export function addTarget(targetId: string) {
	return {
		type: ADD_TARGET,
		targetId,
	}
}

export function removeSource(sourceId: string) {
	return {
		type: REMOVE_SOURCE,
		sourceId,
	}
}

export function removeTarget(targetId: string) {
	return {
		type: REMOVE_TARGET,
		targetId,
	}
}
