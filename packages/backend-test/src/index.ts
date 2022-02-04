import type { DragDropManager, BackendFactory } from 'dnd-core'
import { TestBackendImpl } from './TestBackend'
import type {
	ITestBackend,
	TestBackendContext,
	TestBackendOptions,
} from './types'

export * from './types'
export * from './TestBackend'

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
