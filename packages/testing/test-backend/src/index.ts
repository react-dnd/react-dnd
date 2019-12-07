import TestBackend from './TestBackend'
import { DragDropManager, BackendFactory } from 'dnd-core'
export { TestBackend } from './TestBackend'

let instance: TestBackend | undefined

export function getInstance() {
	return instance
}

export function clearInstance() {
	instance = undefined
}

export const Backend: BackendFactory = (manager: DragDropManager) => {
	instance = new TestBackend(manager)
	return instance
}
