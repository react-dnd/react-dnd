import type { BackendFactory, DragDropManager } from 'dnd-core'

import { TestBackendImpl } from './TestBackend.js'
import type {
	ITestBackend,
	TestBackendContext,
	TestBackendOptions,
} from './types.js'

export * from './TestBackend.js'
export * from './types.js'

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
