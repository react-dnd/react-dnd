import Example from '../index'
import '@testing-library/jest-dom'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { render, act, fireEvent } from '@testing-library/react'
import { tick } from 'react-dnd-test-utils'
import { DndProvider } from 'react-dnd'

describe('Integration: Dustbin Single Target', () => {
	it('can simulate a full drag and drop interaction', async () => {
		const rendered = render(
			<DndProvider backend={HTML5Backend}>
				<Example />
			</DndProvider>,
		)
		window.alert = jest.fn()
		const box = (await rendered.findAllByRole('Box'))[0]
		const dustbin = await rendered.findByRole('Dustbin')
		expect(box).toBeDefined()
		expect(dustbin).toBeDefined()

		await act(async () => {
			fireEvent.dragStart(box)
			fireEvent.dragEnter(dustbin)
			fireEvent.dragOver(dustbin)
			fireEvent.drop(dustbin)
		})
		expect(window.alert).toHaveBeenCalledWith(`You dropped Glass into Dustbin!`)
	})
})
