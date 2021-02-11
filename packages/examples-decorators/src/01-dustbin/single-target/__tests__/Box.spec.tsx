import '@testing-library/jest-dom'
import { render, fireEvent, act } from '@testing-library/react'
import Box from '../Box'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { tick } from 'react-dnd-test-utils'

describe('Box', () => {
	it('can be tested independently', () => {
		// Obtain the reference to the component before React DnD wrapping
		const OriginalBox = Box.DecoratedComponent

		// Stub the React DnD connector functions with an identity function
		const identity = (x: any) => x

		// Render with one set of props and test
		const rendered = render(
			<OriginalBox
				name="test"
				connectDragSource={identity}
				isDragging={false}
			/>,
		)

		let box = rendered.getByTestId('box-test')
		expect(box).toHaveStyle({ opacity: '1' })

		// Render with another set of props and test
		rendered.rerender(
			<OriginalBox
				name="test"
				connectDragSource={identity}
				isDragging={true}
			/>,
		)
		box = rendered.getByTestId('box-test')
		expect(box).toHaveStyle({ opacity: '0.4' })
	})

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
		expect(rendered.getByTestId('box-test')).toHaveStyle({ opacity: '0.4' })

		// Opacity returns on dragend
		fireEvent.dragEnd(box)
		expect(rendered.getByTestId('box-test')).toHaveStyle({ opacity: '1' })
	})
})
