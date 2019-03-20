import createHTML5Backend, { HTML5BackendContext } from '../index'
import { DragDropManager } from 'dnd-core'

describe('index', () => {
	it('should return HTML5 backend', () => {
		const mockManager: DragDropManager<HTML5BackendContext> = {
			getActions: () => null,
			getMonitor: () => null,
			getRegistry: () => null,
			getContext: () => ({}),
		} as any
		const backend = createHTML5Backend(mockManager)
		expect(backend).toBeDefined()
	})
})
