import { cleanup, render } from '@testing-library/react'

import { TestBackend } from 'react-dnd-test-backend'

import { DndProvider } from '../../core/index.js'
import { useDrag } from '../useDrag/index.js'

describe('The useDrag hook', () => {
	afterEach(cleanup)

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

	it('throws if "begin" is defined', () => {
		function Component() {
			const [, drag] = useDrag({
				type: 'box',
				begin() {
					return { id: 1 }
				},
			} as any)
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
			).toThrow(
				'useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)',
			)
		} finally {
			console.error = err
		}
	})

	it('throws if type is null', () => {
		function Component() {
			const [, drag] = useDrag({
				type: null as any,
			})
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
			).toThrow(/spec.type must be defined/)
		} finally {
			console.error = err
		}
	})

	it('can be used inside of a React-DnD context', async () => {
		const TestCase = function Component() {
			const [, drag] = useDrag({
				type: 'box',
			})
			return <div ref={drag} role="root" />
		}
		const result = render(
			<DndProvider backend={TestBackend}>
				<TestCase />
			</DndProvider>,
		)
		const root = await result.findByRole('root')
		expect(root).toBeDefined()
	})
})
