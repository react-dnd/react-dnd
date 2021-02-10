import { DragDropManager, BackendFactory } from 'dnd-core'
import { ITestBackend, TestBackendImpl } from './TestBackend'
export * from './TestBackend'

export interface TestBackendContext {
	window?: Window
	document?: Document
}

export interface TestBackendOptions {
	onCreate?: (be: ITestBackend) => void
}

export const TestBackend: BackendFactory = function createBackend(
	manager: DragDropManager,
	context: TestBackendContext = {},
	options: TestBackendOptions = {},
): ITestBackend {
	const result = new TestBackendImpl(manager, context)
	if (options?.onCreate) {
		options.onCreate(result)
	}
	return result
}
