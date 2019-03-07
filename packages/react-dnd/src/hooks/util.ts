import { Identifier } from 'dnd-core'

export interface HandlerManager {
	receiveHandlerId: (handlerId: Identifier | null) => void
	getHandlerId: () => Identifier | null
}

export interface Ref<T> {
	current: T
}

export function isRef(obj: any) {
	if (obj !== null && typeof obj === 'object') {
		const keys = Object.keys(obj)
		return keys.length === 1 && keys[0] === 'current'
	}
	return false
}
