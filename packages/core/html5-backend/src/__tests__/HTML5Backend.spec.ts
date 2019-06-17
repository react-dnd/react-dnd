declare var global: any

import HTML5Backend from '../HTML5Backend'
import { DragDropManager } from 'dnd-core'
import { HTML5BackendContext } from '../interfaces'

describe('The HTML5 Backend', () => {
	describe('window injection', () => {
		it('uses an undefined window when no window is available', () => {
			const mockManager: DragDropManager<HTML5BackendContext> = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({}),
			} as any
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
			const mockManager: DragDropManager<HTML5BackendContext> = {
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
			const mockManager: DragDropManager<HTML5BackendContext> = {
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

	describe('setup and teardown', () => {
		let backend: HTML5Backend
		let mockManager: DragDropManager<HTML5BackendContext>
		let fakeWindow: any = {}
		beforeEach(() => {
			mockManager = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
				getContext: () => ({
					window: fakeWindow,
				}),
			} as any
		})

		afterEach(() => {
			fakeWindow = {}
		})

		it('should throw error if two instances of html5 backend are setup', () => {
			backend = new HTML5Backend(mockManager)
			backend.setup()
			try {
				backend.setup()
			} catch (e) {
				expect(e.message).toEqual(
					'Cannot have two HTML5 backends at the same time.',
				)
			}
		})

		it('should set __isReactDndBackendSetUp on setup', () => {
			backend = new HTML5Backend(mockManager)
			backend.setup()
			expect(fakeWindow.__isReactDndBackendSetUp).toBeTruthy()
		})

		it('should unset ____isReactDndBackendSetUp on teardown', () => {
			backend = new HTML5Backend(mockManager)
			backend.setup()
			backend.teardown()
			expect(fakeWindow.__isReactDndBackendSetUp).toBeFalsy()
		})

		it('should be able to call setup after teardown', () => {
			backend = new HTML5Backend(mockManager)
			backend.setup()
			backend.teardown()
			backend.setup()
			expect(fakeWindow.__isReactDndBackendSetUp).toBeTruthy()
		})
	})
})
