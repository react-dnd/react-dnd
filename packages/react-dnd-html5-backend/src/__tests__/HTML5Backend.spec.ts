import HTML5Backend from '../HTML5Backend'
import { IDragDropManager } from 'dnd-core'
import { IHTML5BackendContext } from '../interfaces'

describe('The HTML5 Backend', () => {
	describe('window injection', () => {
		it('uses an undefined window when no window is available', () => {
			const mockManager: IDragDropManager<IHTML5BackendContext> = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({}),
			} as any
			const mockWindow = (global as any).window
			try {
				delete (global as any).window
				const backend = new HTML5Backend(mockManager)
				expect(backend).toBeDefined()
				expect(backend.window).toBeUndefined()
			} finally {
				;(global as any).window = mockWindow
			}
		})

		it('uses the ambient window global', () => {
			const mockManager: IDragDropManager<IHTML5BackendContext> = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({}),
			} as any
			const backend = new HTML5Backend(mockManager)
			expect(backend).toBeDefined()
			expect(backend.window).toBeDefined()
		})

		it('allows a window to be injected', () => {
			const fakeWindow = {
				x: 1,
			}
			const mockManager: IDragDropManager<IHTML5BackendContext> = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({
					window: fakeWindow,
				}),
			} as any
			const backend = new HTML5Backend(mockManager)
			expect(backend).toBeDefined()
			expect(backend.window).toBe(fakeWindow)
		})
	})
})
