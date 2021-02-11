import Example from '../index'
import { Box, BoxProps } from '../Box'
import { Dustbin } from '../Dustbin'
import {
	wrapInTestContext,
	simulateDragDropSequence,
} from 'react-dnd-test-utils'
import { Identifier } from 'dnd-core'
import { mount } from 'enzyme'
import { DndComponent } from 'react-dnd'

describe('Integration: Dustbin Single Target', () => {
	it('can simulate a full drag and drop interaction', () => {
		function TestCase() {
			return <Example />
		}
		const [WrappedTestCase, getBackend] = wrapInTestContext(TestCase)

		// Render with the test context that uses the test backend
		const root = mount(<WrappedTestCase />)

		// Find the drag source ID and use it to simulate the dragging operation
		const box: DndComponent<BoxProps> = root.find(Box).at(0)
		const dustbin: DndComponent<Record<string, never>> = root.find(Dustbin)

		window.alert = jest.fn()

		const getHandlerId = (c): Identifier =>
			c.find('[data-handler-id]').props()['data-handler-id']

		simulateDragDropSequence(
			getHandlerId(box),
			getHandlerId(dustbin),
			getBackend(),
		)
		expect(window.alert).toHaveBeenCalledWith(
			`You dropped ${box.props().name} into Dustbin!`,
		)
	})
})
