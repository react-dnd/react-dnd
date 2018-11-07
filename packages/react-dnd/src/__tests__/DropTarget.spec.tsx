// tslint:disable max-classes-per-file
import * as React from 'react'
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
		const Component: React.SFC<{}> = () => null
		const DecoratedComponent = DropTarget(
			'abc',
			{
				drop: () => ({}),
			},
			() => ({}),
		)(Component)

		expect(DecoratedComponent).toBeDefined()
	})
})
