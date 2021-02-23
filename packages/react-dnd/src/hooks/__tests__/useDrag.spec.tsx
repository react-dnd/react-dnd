import { useDrag } from '../useDrag'
import { wrapWithBackend } from 'react-dnd-test-utils'
import { render } from '@testing-library/react'

describe('The useDrag hook', () => {
	it('throws if rendered outside of a React-DnD tree', () => {
		function Component() {
			const [, drag] = useDrag(() => ({
				item: { type: 'box' },
			}))
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

	it('can be used inside of a React-DnD context', async () => {
		const Wrapped = wrapWithBackend(function Component() {
			const [, drag] = useDrag(() => ({
				item: { type: 'box' },
			}))
			return <div ref={drag} role="root" />
		})
		const result = render(<Wrapped />)
		const root = await result.findByRole('root')
		expect(root.draggable).toBeTruthy()
	})
})
