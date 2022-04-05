import type { DragDropManager } from 'dnd-core'

import { HTML5Backend } from '../index.js'

describe('index', () => {
	it('should return HTML5 backend', () => {
		const mockManager: DragDropManager = {
			getActions: () => null,
			getMonitor: () => null,
			getRegistry: () => null,
		} as any
		const backend = HTML5Backend(mockManager)
		expect(backend).toBeDefined()
	})
})
