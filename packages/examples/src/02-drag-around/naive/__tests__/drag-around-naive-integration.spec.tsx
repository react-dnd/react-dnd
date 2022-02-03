import Example from '../index'
import { fireEvent, render, cleanup } from '@testing-library/react'
import {
	wrapWithBackend,
	fireDrag,
	fireReleaseDrag,
	tick,
} from 'react-dnd-test-utils'

describe('Drag Around: Naive', () => {
	afterEach(cleanup)

	it('can hide the source node on drag', async () => {
		const TestExample = wrapWithBackend(Example)
		const rendered = render(<TestExample />)
		const getBoxes = () => rendered.findAllByRole('Box')
		const boxes = await getBoxes()
		expect(boxes.length).toEqual(2)
		const first = boxes[0]

		// Dragging a box hides it
		await fireDrag(first)
		await tick()
		expect(await getBoxes()).toHaveLength(1)

		// Dropping the box shows it again
		await fireReleaseDrag(first)
		expect(await getBoxes()).toHaveLength(2)
	})

	it('can disable source hiding', async () => {
		const TestExample = wrapWithBackend(Example)
		const rendered = render(<TestExample />)
		const getBoxes = () => rendered.findAllByRole('Box')
		const boxes = await getBoxes()
		const checkbox = await rendered.findByRole('checkbox')
		expect(boxes.length).toEqual(2)
		const first = boxes[0]

		// disable source hiding
		await fireEvent.click(checkbox)

		// Drag a box
		await fireDrag(first)
		await tick()
		expect(await getBoxes()).toHaveLength(2)

		// Drop the box
		await fireReleaseDrag(first)
		expect(await getBoxes()).toHaveLength(2)
	})
})
