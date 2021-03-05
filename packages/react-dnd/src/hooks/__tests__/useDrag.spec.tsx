import { useDrag } from '../useDrag'
import { wrapWithBackend } from 'react-dnd-test-utils'
import { render } from '@testing-library/react'

describe('The useDrag hook', () => {
	it('throws if rendered outside of a React-DnD tree', () => {
		function Component() {
			const [, drag] = useDrag({
				type: 'box',
			})
			return <div ref={drag} />
		}

		const err = console.error
		try {
			const errorMock = jest.fn()
			console.error = errorMock
			expect(() => render(<Component />)).toThrow(/Expected drag drop context/)
		} finally {
			console.error = err
		}
	})

	it('throws if type is null', () => {
		function Component() {
			const [, drag] = useDrag({
				type: null,
			})
			return <div ref={drag} />
		}
		const Wrapped = wrapWithBackend(Component)

		const err = console.error
		try {
			const errorMock = jest.fn()
			console.error = errorMock
			expect(() => render(<Wrapped />)).toThrow(/spec.type must be defined/)
		} finally {
			console.error = err
		}
	})

	it('can be used inside of a React-DnD context', async () => {
		const Wrapped = wrapWithBackend(function Component() {
			const [, drag] = useDrag({
				type: 'box',
			})
			return <div ref={drag} role="root" />
		})
		const result = render(<Wrapped />)
		const root = await result.findByRole('root')
		expect(root.draggable).toBeTruthy()
	})
})
