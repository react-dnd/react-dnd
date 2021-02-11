import Example from '..'
import { Dustbin } from '../Dustbin'
import { Box } from '../Box'
import { Identifier } from 'dnd-core'
import {
	wrapInTestContext,
	simulateDragDropSequence,
} from 'react-dnd-test-utils'
import { mount } from 'enzyme'

describe('Dustbin: Multiple Targets', () => {
	it('behaves as expected', async () => {
		const [Wrapped, getBackend] = wrapInTestContext(Example)
		const root = mount(<Wrapped />)

		// Verify that all of the key components mounted
		const dustbins = root.find(Dustbin)
		const boxes = root.find(Box)
		expect(dustbins.length).toEqual(4)
		expect(boxes.length).toEqual(3)

		window.alert = jest.fn()

		// Bin Types
		const glassBin = () => root.find(Dustbin).at(0)
		const foodBin = () => root.find(Dustbin).at(1)

		// Box Types
		const bottleBox = () => root.find(Box).at(0)
		const bananaBox = () => root.find(Box).at(1)

		// interactions

		const getHandlerId = (c: any): Identifier =>
			c.find('[data-handler-id]').props()['data-handler-id']

		// drop bottle into glass bin
		simulateDragDropSequence(
			getHandlerId(bottleBox()),
			getHandlerId(glassBin()),
			getBackend(),
		)
		root.update()
		expect(glassBin().props().lastDroppedItem).not.toBeNull()
		expect(glassBin().props().lastDroppedItem.name).toEqual(
			bottleBox().props().name,
		)

		// food won't drop into the glass bin
		simulateDragDropSequence(
			getHandlerId(bananaBox()),
			getHandlerId(glassBin()),
			getBackend(),
		)
		root.update()
		expect(glassBin().props().lastDroppedItem.name).toEqual(
			bottleBox().props().name,
		)

		// glass won't drop into the food box...
		simulateDragDropSequence(
			getHandlerId(bottleBox()),
			getHandlerId(foodBin()),
			getBackend(),
		)
		root.update()
		expect(foodBin().props().lastDroppedItem).toBeNull()

		// but some food will work
		simulateDragDropSequence(
			getHandlerId(bananaBox()),
			getHandlerId(foodBin()),
			getBackend(),
		)
		root.update()
		expect(foodBin().props().lastDroppedItem.name).toEqual(
			bananaBox().props().name,
		)
	})
})
