import TestBackend from './TestBackend'
import { DragDropManager, BackendFactory } from 'dnd-core'
export { TestBackend } from './TestBackend'

let instance: TestBackend | undefined

export function getInstance(): TestBackend | undefined {
	return instance
}

export function clearInstance(): void {
	instance = undefined
}

const createBackend: BackendFactory = (manager: DragDropManager) => {
	instance = new TestBackend(manager)
	return instance
}
export default createBackend
