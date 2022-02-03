import { render, fireEvent, cleanup } from '@testing-library/react'
import { Box } from '../Box'
import { wrapWithBackend, fireDrag } from 'react-dnd-test-utils'

describe('Box', () => {
	afterEach(cleanup)

	it('can be tested with a backend', async () => {
		const TestBox = wrapWithBackend(Box)
		const rendered = render(<TestBox name="test" />)

		// Check that the opacity is 1
		const box = rendered.getByTestId('box-test')
		expect(box).toBeDefined()
		expect(box).toHaveStyle({ opacity: '1' })

		// Opacity drops on Drag
		await fireDrag(box)
		expect(box).toHaveStyle({ opacity: '0.4' })

		// Opacity returns on dragend
		fireEvent.dragEnd(box)
		expect(box).toHaveStyle({ opacity: '1' })
	})
})
