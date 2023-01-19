import { cleanup, render } from '@testing-library/react'

import { TestBackend } from 'react-dnd-test-backend'

import { DndProvider } from '../../index.js'
import { useDrop } from '../useDrop/index.js'

describe('The useDrop hook', () => {
	afterEach(cleanup)

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
			const [, drag] = useDrop(
				() =>
					({
						accept: null,
					}) as any,
			)
			return <div ref={drag} />
		}

		const err = console.error
		try {
			const errorMock = jest.fn()
			console.error = errorMock
			expect(() =>
				render(
					<DndProvider backend={TestBackend}>
						<Component />
					</DndProvider>,
				),
			).toThrow(/accept must be defined/)
		} finally {
			console.error = err
		}
	})

	it('can be used inside of a React-DnD context', async () => {
		const Component = function Component() {
			const [, drag] = useDrop(() => ({
				accept: 'box',
			}))
			return <div ref={drag} role="root" />
		}
		const result = render(
			<DndProvider backend={TestBackend}>
				<Component />
			</DndProvider>,
		)
		const root = await result.findByRole('root')
		expect(root).toBeDefined()
	})
})
