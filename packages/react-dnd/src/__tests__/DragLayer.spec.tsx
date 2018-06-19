// tslint:disable max-classes-per-file
import * as React from 'react'
import { DragLayer } from '../index'

describe('DragLayer', () => {
	it('can apply to a class via decorator-fashion', () => {
		@DragLayer(() => ({}))
		class DecoratedClass extends React.Component {}

		expect(DecoratedClass).toBeDefined()
	})

	it('can apply via composition', () => {
		class ContextClass extends React.Component {}
		const DecoratedClass = DragLayer(() => ({}))(ContextClass)
		expect(DecoratedClass).toBeDefined()
	})

	it('can apply to an SFC', () => {
		const Component: React.SFC<{}> = () => null
		const DecoratedComponent = DragLayer(() => ({}))(Component)

		expect(DecoratedComponent).toBeDefined()
	})
})
