import Example from '../index'
import '@testing-library/jest-dom'
import { render, act, fireEvent } from '@testing-library/react'
import { wrapWithBackend } from 'react-dnd-test-utils'

describe('Integration: Dustbin Single Target', () => {
	it('can simulate a full drag and drop interaction', async () => {
		const TestExample = wrapWithBackend(Example)
		const rendered = render(<TestExample />)

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
