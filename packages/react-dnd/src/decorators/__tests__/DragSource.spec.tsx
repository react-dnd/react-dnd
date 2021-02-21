import { Component, ReactNode, FC, RefForwardingComponent } from 'react'
import * as TestUtils from 'react-dom/test-utils'
import { DragSource } from '../index'

describe('DragSource', () => {
	it('can apply via composition', () => {
		class ContextClass extends Component {}
		const DecoratedClass = DragSource(
			'abc',
			{ beginDrag: () => null },
			() => ({}),
		)(ContextClass)
		expect(DecoratedClass).toBeDefined()
	})

	it('can apply to an SFC', () => {
		const Component: FC = () => null
		const DecoratedComponent = DragSource(
			'abc',
			{ beginDrag: () => null },
			() => ({}),
		)(Component)

		expect(DecoratedComponent).toBeDefined()
	})

	it('can apply to a ref-forwarded component', () => {
		interface RFProps {
			children?: ReactNode
		}

		const RefForwarded: RefForwardingComponent<HTMLDivElement, RFProps> = () =>
			null

		const DecoratedComponent = DragSource(
			'test_id',
			{ beginDrag: () => null },
			() => ({}),
		)(RefForwarded)

		expect(DecoratedComponent).toBeDefined()
	})

	it('throws an error if rendered outside a DndContext', () => {
		console.error = jest.fn()
		const Component: FC = () => null
		const DecoratedComponent = DragSource(
			'abc',
			{ beginDrag: () => null },
			() => ({}),
		)(Component)

		expect(() => {
			TestUtils.renderIntoDocument(<DecoratedComponent />)
		}).toThrow(/Could not find the drag and drop manager in the context/)
	})
})
