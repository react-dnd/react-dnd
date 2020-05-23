import { createDragDropManager } from 'dnd-core'
import * as React from 'react'
import { create } from 'react-test-renderer'
import { DndContext, DndProvider } from '..'
import { TestBackend } from 'react-dnd-test-backend'

describe('DndProvider', () => {
	it('reuses DragDropManager provided to it', () => {
		let capturedManager
		const manager = createDragDropManager(TestBackend, {}, {})

		create(
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
			create(
				<DndProvider backend={TestBackend}>
					<DndContext.Consumer>
						{({ dragDropManager }) => {
							capturedManager = dragDropManager
							return null
						}}
					</DndContext.Consumer>
				</DndProvider>,
			)

		const globalInstance = () =>
			global[Symbol.for('__REACT_DND_CONTEXT_INSTANCE__')]

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
