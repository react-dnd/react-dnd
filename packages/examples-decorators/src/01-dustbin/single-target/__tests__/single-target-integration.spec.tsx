import Example from '../index'
import Box, { BoxProps } from '../Box'
import Dustbin, { DustbinProps } from '../Dustbin'
import {
	wrapInTestContext,
	simulateDragDropSequence,
} from 'react-dnd-test-utils'
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
		const box: DndComponent<BoxProps> = root.find(Box).at(0).instance() as any
		const dustbin: DndComponent<DustbinProps> = root
			.find(Dustbin)
			.instance() as any

		window.alert = jest.fn()
		simulateDragDropSequence(box, dustbin, getBackend())
		expect(window.alert).toHaveBeenCalledWith(
			`You dropped ${box.props.name} into Dustbin!`,
		)
	})
})
