declare const global: any

import HTML5Backend from '../HTML5Backend'
import createBackend from '../index'
import { DragDropManager } from 'dnd-core'

describe('The HTML5 Backend', () => {
	describe('window injection', () => {
		it('uses an undefined window when no window is available', () => {
			const mockManager: DragDropManager = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
			} as any
			const mockWindow = global.window
			try {
				delete global.window
				const backend = createBackend(mockManager) as HTML5Backend
				expect(backend).toBeDefined()
				expect(backend.window).toBeUndefined()
			} finally {
				global.window = mockWindow
			}
		})

		it('uses the ambient window global', () => {
			const mockManager: DragDropManager = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
			} as any
			const backend = createBackend(mockManager, window) as HTML5Backend
			expect(backend).toBeDefined()
			expect(backend.window).toBeDefined()
		})

		it('allows a window to be injected', () => {
			const fakeWindow = {
				x: 1,
			}
			const mockManager: DragDropManager = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
			} as any
			const backend = createBackend(mockManager, fakeWindow) as HTML5Backend
			expect(backend).toBeDefined()
			expect(backend.window).toBe(fakeWindow)
		})
	})

	describe('setup and teardown', () => {
		let backend: HTML5Backend
		let mockManager: DragDropManager
		let fakeWindow: any = {}
		beforeEach(() => {
			mockManager = {
				getActions: () => null,
				getMonitor: () => null,
				getRegistry: () => null,
			} as any
		})

		afterEach(() => {
			fakeWindow = {}
		})

		it('should throw error if two instances of html5 backend are setup', () => {
			backend = createBackend(mockManager, {
				window: fakeWindow,
			}) as HTML5Backend
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
			backend = createBackend(mockManager, fakeWindow) as HTML5Backend
			backend.setup()
			expect(fakeWindow.__isReactDndBackendSetUp).toBeTruthy()
		})

		it('should unset ____isReactDndBackendSetUp on teardown', () => {
			backend = createBackend(mockManager, fakeWindow) as HTML5Backend
			backend.setup()
			backend.teardown()
			expect(fakeWindow.__isReactDndBackendSetUp).toBeFalsy()
		})

		it('should be able to call setup after teardown', () => {
			backend = createBackend(mockManager, fakeWindow) as HTML5Backend
			backend.setup()
			backend.teardown()
			backend.setup()
			expect(fakeWindow.__isReactDndBackendSetUp).toBeTruthy()
		})
	})
})
