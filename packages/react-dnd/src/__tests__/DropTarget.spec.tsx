import * as React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import { DropTarget } from '../index'

describe('DropTarget', () => {
	it('can apply via composition', () => {
		class ContextClass extends React.Component {}
		const DecoratedClass = DropTarget(
			'abc',
			{
				drop: () => ({}),
			},
			() => ({}),
		)(ContextClass)
		expect(DecoratedClass).toBeDefined()
	})

	it('can apply to an function component', () => {
		const Component: React.FC<{}> = () => null
		const DecoratedComponent = DropTarget(
			'abc',
			{
				drop: () => ({}),
			},
			() => ({}),
		)(Component)

		expect(DecoratedComponent).toBeDefined()
	})

	it('throws an error if rendered outside a DragDropContext', () => {
		const Component: React.FC<{}> = () => null
		const DecoratedComponent = DropTarget(
			'abc',
			{
				drop: () => ({}),
			},
			() => ({}),
		)(Component)

		expect(() => {
			TestUtils.renderIntoDocument(<DecoratedComponent />)
		}).toThrow(/Could not find the drag and drop manager in the context/)
	})
})
