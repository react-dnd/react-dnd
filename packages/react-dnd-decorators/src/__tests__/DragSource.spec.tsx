import * as React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import { DragSource } from '../index'

describe('DragSource', () => {
	it('can apply via composition', () => {
		class ContextClass extends React.Component {}
		const DecoratedClass = DragSource(
			'abc',
			{ beginDrag: () => null },
			() => ({}),
		)(ContextClass)
		expect(DecoratedClass).toBeDefined()
	})

	it('can apply to an SFC', () => {
		const Component: React.FC<{}> = () => null
		const DecoratedComponent = DragSource(
			'abc',
			{ beginDrag: () => null },
			() => ({}),
		)(Component)

		expect(DecoratedComponent).toBeDefined()
	})

	it('can apply to a ref-forwarded component', () => {
		interface RFProps {
			children?: React.ReactNode
		}

		const RefForwarded: React.RefForwardingComponent<
			HTMLDivElement,
			RFProps
		> = () => null

		const DecoratedComponent = DragSource(
			'test_id',
			{ beginDrag: () => null },
			() => ({}),
		)(RefForwarded)

		expect(DecoratedComponent).toBeDefined()
	})

	it('throws an error if rendered outside a DragDropContext', () => {
		const Component: React.FC<{}> = () => null
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
