import { createDragDropManager } from 'dnd-core'
import * as React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import { DndContext } from '..'
import TestBackend from 'react-dnd-test-backend'

describe('DragDropContextProvider', () => {
	it('reuses DragDropManager provided to it', () => {
		let capturedManager
		const manager = createDragDropManager(TestBackend, {})

		const ManagerCapture = () => (
			<DndContext.Provider value={{ dragDropManager: manager }}>
				<DndContext.Consumer>
					{({ dragDropManager }) => {
						capturedManager = dragDropManager
						return null
					}}
				</DndContext.Consumer>
			</DndContext.Provider>
		)

		TestUtils.renderIntoDocument(<ManagerCapture />)
		expect(capturedManager).toBe(manager)
	})
})
