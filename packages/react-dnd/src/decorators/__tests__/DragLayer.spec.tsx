import { Component } from 'react'
import { DragLayer } from '../index'

describe('DragLayer', () => {
	it('can apply via composition', () => {
		class ContextClass extends Component {}
		const DecoratedClass = DragLayer(() => ({}))(ContextClass)
		expect(DecoratedClass).toBeDefined()
	})

	it('can apply to a function component', () => {
		const Component: FC = () => null
		const DecoratedComponent = DragLayer(() => ({}))(Component)

		expect(DecoratedComponent).toBeDefined()
	})
})
