import { cleanup, render } from '@testing-library/react'
import { createDragDropManager } from 'dnd-core'
import { TestBackend } from 'react-dnd-test-backend'

import type { DndContextType } from '../DndContext.js'
import { DndContext } from '../DndContext.js'
import { DndProvider } from '../DndProvider.js'

describe('DndProvider', () => {
	afterEach(cleanup)

	it('reuses DragDropManager provided to it', () => {
		let capturedManager
		const manager = createDragDropManager(TestBackend, {}, {})

		render(
			<DndContext.Provider value={{ dragDropManager: manager }}>
				<DndContext.Consumer>
					{({ dragDropManager }) => {
						capturedManager = dragDropManager
						return null
					}}
				</DndContext.Consumer>
			</DndContext.Provider>,
		)

		expect(capturedManager).toBe(manager)
	})

	it('stores DragDropManager in global context and cleans up on unmount', () => {
		let capturedManager

		const mountProvider = () =>
			render(
				<DndProvider backend={TestBackend}>
					<DndContext.Consumer>
						{({ dragDropManager }) => {
							capturedManager = dragDropManager
							return null
						}}
					</DndContext.Consumer>
				</DndProvider>,
			)

		const globalInstance = (): DndContextType =>
			(global as any)[Symbol.for('__REACT_DND_CONTEXT_INSTANCE__')] as any

		// Single mount & unmount works
		const root = mountProvider()
		expect(globalInstance().dragDropManager).toEqual(capturedManager)
		root.unmount()
		expect(globalInstance()).toEqual(null)

		// Two mounted components do a refcount
		const rootA = mountProvider()
		const rootB = mountProvider()
		expect(globalInstance().dragDropManager).toEqual(capturedManager)
		rootA.unmount()
		expect(globalInstance().dragDropManager).toEqual(capturedManager)
		rootB.unmount()
		expect(globalInstance()).toEqual(null)
	})
})
