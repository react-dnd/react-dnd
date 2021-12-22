import Example from '..'
import { wrapWithBackend, fireDragDrop } from 'react-dnd-test-utils'
import { render, cleanup } from '@testing-library/react'

describe('Dustbin: Multiple Targets', () => {
	afterEach(cleanup)

	it('behaves as expected', async () => {
		const TestExample = wrapWithBackend(Example)
		const rendered = render(<TestExample />)

		// Verify that all of the key components mounted
		const dustbins = await rendered.findAllByRole('Dustbin')
		const boxes = await rendered.findAllByRole('Box')
		expect(dustbins.length).toEqual(4)
		expect(boxes.length).toEqual(3)

		window.alert = jest.fn()

		// Bin Types
		const glassBin = dustbins[0]
		const foodBin = dustbins[1]

		// Box Types
		const bottleBox = boxes[0] as HTMLDivElement
		const bananaBox = boxes[1]

		// interactions

		// drop bottle into glass bin
		await fireDragDrop(bottleBox, glassBin)
		expect(glassBin.textContent).toContain(JSON.stringify({ name: 'Bottle' }))

		// food won't drop into the glass bin
		await fireDragDrop(bananaBox, glassBin)
		expect(glassBin.textContent).toContain(JSON.stringify({ name: 'Bottle' }))

		// glass won't drop into the food box...
		await fireDragDrop(bottleBox, foodBin)
		expect(foodBin.textContent).not.toContain('Last dropped')

		// but some food will work
		await fireDragDrop(bananaBox, foodBin)
		expect(foodBin.textContent).toContain('Last dropped')
		expect(foodBin.textContent).toContain(JSON.stringify({ name: 'Banana' }))
	})
})
