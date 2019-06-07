import { createDragDropManager } from 'dnd-core'
import * as React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import {
	DragDropContext,
	DragDropContextProvider,
	DragDropContextConsumer,
} from '../index'
import TestBackend from 'react-dnd-test-backend'

describe('DragDropContext', () => {
	it('can apply to a class via decorator-fashion', () => {
		@DragDropContext(TestBackend)
		class Context extends React.Component {}

		expect(Context).toBeDefined()
	})

	it('can apply via composition', () => {
		class ContextClass extends React.Component {}
		const Context = DragDropContext(TestBackend)(ContextClass)

		expect(Context).toBeDefined()
	})

	it('can apply to an SFC', () => {
		const ContextComponent: React.FC<{}> = () => null
		const Context = DragDropContext(TestBackend)(ContextComponent)

		expect(Context).toBeDefined()
	})
})

describe('DragDropContextProvider', () => {
	it('reuses DragDropManager provided to it', () => {
		let capturedManager
		const manager = createDragDropManager(TestBackend, {})

		const ManagerCapture = () => (
			<DragDropContextProvider manager={manager}>
				<DragDropContextConsumer>
					{({ dragDropManager }) => {
						capturedManager = dragDropManager
						return null
					}}
				</DragDropContextConsumer>
			</DragDropContextProvider>
		)

		TestUtils.renderIntoDocument(<ManagerCapture />)
		expect(capturedManager).toBe(manager)
	})
})
