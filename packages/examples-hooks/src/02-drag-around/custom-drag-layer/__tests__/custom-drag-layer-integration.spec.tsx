import Example from '../index'
import { act, fireEvent, render, cleanup } from '@testing-library/react'
import { wrapWithBackend, tick } from 'react-dnd-test-utils'

describe('Drag Around: Custom Drag Layer', () => {
	afterEach(cleanup)

	it('toggles the overlay layer over time', async () => {
		jest.useFakeTimers('modern')
		const TestExample = wrapWithBackend(Example)
		const rendered = render(<TestExample />)
		const draggableBoxes = await rendered.findAllByRole('DraggableBox')
		expect(draggableBoxes).toHaveLength(2)
		const first = draggableBoxes[0]
		const second = draggableBoxes[1]

		// Dragging a box hides it
		let tickAwait: Promise<void>
		await act(async () => {
			fireEvent.dragStart(first)
			tickAwait = tick()
			jest.advanceTimersByTime(10)
			await tickAwait
		})

		expect(first).toHaveStyle({ opacity: 0 })
		expect(second).toHaveStyle({ opacity: 1 })

		const preview = await rendered.findByRole('BoxPreview')
		expect(preview).toHaveStyle({ backgroundColor: 'white' })

		act(() => {
			jest.advanceTimersByTime(501)
		})
		expect(preview).toHaveStyle({ backgroundColor: 'yellow' })

		act(() => {
			jest.advanceTimersByTime(501)
		})
		expect(preview).toHaveStyle({ backgroundColor: 'white' })
	})
})
