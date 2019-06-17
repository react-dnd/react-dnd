import * as React from 'react'
import { DragDropContext } from '../index'
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
