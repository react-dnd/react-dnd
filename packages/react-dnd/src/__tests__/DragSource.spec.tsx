// tslint:disable max-classes-per-file
import * as React from 'react'
import { DragSource } from '../index'

describe('DragSource', () => {
	it('can apply to a class via decorator-fashion', () => {
		@DragSource('abc', { beginDrag: () => null }, () => ({}))
		class DecoratedClass extends React.Component {}

		expect(DecoratedClass).toBeDefined()
	})

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
		const Component: React.SFC<{}> = () => null
		const DecoratedComponent = DragSource(
			'abc',
			{ beginDrag: () => null },
			() => ({}),
		)(Component)

		expect(DecoratedComponent).toBeDefined()
	})

	it('can apply to a ref-forwarded component', () => {
		const RefForwarded: React.RefForwardingComponent<any, {}> = (props, ref) =>
			null
		const DecoratedComponent = DragSource(
			'abc',
			{ beginDrag: () => null },
			() => ({}),
		)(RefForwarded)

		expect(DecoratedComponent).toBeDefined()
	})
})
