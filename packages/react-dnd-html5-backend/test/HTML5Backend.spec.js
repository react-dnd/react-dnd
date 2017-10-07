import HTML5Backend from '../src/HTML5Backend'

describe('The HTML5 Backend', () => {
	describe('window injection', () => {
		it('uses an undefined window when no window is available', () => {
			const mockManager = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({}),
			}
			const mockWindow = global.window
			try {
				delete global.window
				const backend = new HTML5Backend(mockManager)
				expect(backend).toBeDefined()
				expect(backend.window).toBeUndefined()
			} finally {
				global.window = mockWindow
			}
		})

		it('uses the ambient window global', () => {
			const mockManager = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({}),
			}
			const backend = new HTML5Backend(mockManager)
			expect(backend).toBeDefined()
			expect(backend.window).toBeDefined()
		})

		it('allows a window to be injected', () => {
			const mockManager = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({
					window: {
						x: 1,
					},
				}),
			}
			const backend = new HTML5Backend(mockManager)
			expect(backend).toBeDefined()
			expect(backend.window.x).toEqual(1)
		})
	})
})
