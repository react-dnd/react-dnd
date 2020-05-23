import { DragDropManager, BackendFactory } from 'dnd-core'
import { TestBackend, TestBackendImpl } from './TestBackend'
export * from './TestBackend'

let instance: TestBackend | undefined

export function getInstance(): TestBackend | undefined {
	return instance
}

export function clearInstance(): void {
	instance = undefined
}

export const TestBackendFactory: BackendFactory = function createBackend(
	manager: DragDropManager,
): TestBackend {
	instance = new TestBackendImpl(manager)
	return instance
}
