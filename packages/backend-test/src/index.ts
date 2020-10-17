import { DragDropManager, BackendFactory } from 'dnd-core'
import { ITestBackend, TestBackendImpl } from './TestBackend'
export * from './TestBackend'

let instance: ITestBackend | undefined

export function getInstance(): ITestBackend | undefined {
	return instance
}

export function clearInstance(): void {
	instance = undefined
}

export const TestBackend: BackendFactory = function createBackend(
	manager: DragDropManager,
): ITestBackend {
	instance = new TestBackendImpl(manager)
	return instance
}
