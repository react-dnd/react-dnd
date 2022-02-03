import Example from '../index'
import { render, cleanup } from '@testing-library/react'
import { wrapWithBackend, fireDragDrop } from 'react-dnd-test-utils'

describe('Integration: Dustbin Single Target', () => {
	afterEach(cleanup)

	it('can simulate a full drag and drop interaction', async () => {
		const TestExample = wrapWithBackend(Example)
		const rendered = render(<TestExample />)
		window.alert = jest.fn()
		const box = (await rendered.findAllByRole('Box'))[0]
		const dustbin = await rendered.findByRole('Dustbin')
		expect(box).toBeDefined()
		expect(dustbin).toBeDefined()

		await fireDragDrop(box, dustbin)
		expect(window.alert).toHaveBeenCalledWith(`You dropped Glass into Dustbin!`)
	})
})
