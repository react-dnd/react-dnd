import { useDrop } from '../useDrop'
import { wrapWithBackend } from 'react-dnd-test-utils'
import { render } from '@testing-library/react'

describe('The useDrop hook', () => {
	it('throws if rendered outside of a React-DnD tree', () => {
		function Component() {
			const [, drag] = useDrop(() => ({
				accept: 'box',
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

	it('throws if accept is null', () => {
		function Component() {
			const [, drag] = useDrop(() => ({
				accept: null,
			}))
			return <div ref={drag} />
		}
		const Wrapped = wrapWithBackend(Component)

		const err = console.error
		try {
			const errorMock = jest.fn()
			console.error = errorMock
			expect(() => render(<Wrapped />)).toThrow(/accept must be defined/)
		} finally {
			console.error = err
		}
	})

	it('can be used inside of a React-DnD context', async () => {
		const Wrapped = wrapWithBackend(function Component() {
			const [, drag] = useDrop(() => ({
				accept: 'box',
			}))
			return <div ref={drag} role="root" />
		})
		const result = render(<Wrapped />)
		const root = await result.findByRole('root')
		expect(root).toBeDefined()
	})
})
