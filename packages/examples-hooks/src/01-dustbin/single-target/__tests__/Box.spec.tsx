import '@testing-library/jest-dom'
import { render, fireEvent, act } from '@testing-library/react'
import { Box } from '../Box'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { tick } from 'react-dnd-test-utils'

describe('Box', () => {
	it('can be tested with a backend', async () => {
		const rendered = render(
			<DndProvider backend={HTML5Backend}>
				<Box name="test" />
			</DndProvider>,
		)

		// Check that the opacity is 1
		const box = rendered.getByTestId('box-test')
		expect(box).toBeDefined()
		expect(box).toHaveStyle({ opacity: '1' })

		// Opacity drops on Drag
		await act(async () => {
			fireEvent.dragStart(box)
			await tick()
		})
		expect(box).toHaveStyle({ opacity: '0.4' })

		// Opacity returns on dragend
		fireEvent.dragEnd(box)
		expect(box).toHaveStyle({ opacity: '1' })
	})
})
