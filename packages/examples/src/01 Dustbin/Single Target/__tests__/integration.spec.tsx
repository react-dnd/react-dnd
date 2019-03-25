import * as React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import Box from '../Box'
import Dustbin from '../Dustbin'
import { wrapInTestContext } from 'react-dnd-test-utils'

describe('Integration: Dustbin Single Target', () => {
	it('can simulate a full drag and drop interaction', () => {
		function TestCase() {
			return (
				<div>
					<Dustbin />
					<Box name="test" />
				</div>
			)
		}
		const WrappedTestCase = wrapInTestContext(TestCase)

		// Render with the test context that uses the test backend
		const root: any = TestUtils.renderIntoDocument(<WrappedTestCase />)

		// Obtain a reference to the backend
		const backend = root.getManager().getBackend()

		// Find the drag source ID and use it to simulate the dragging operation
		const box: any = TestUtils.findRenderedComponentWithType(root, Box)
		backend.simulateBeginDrag([box.getHandlerId()])

		window.alert = jest.fn()

		const dustbin: any = TestUtils.findRenderedComponentWithType(root, Dustbin)
		backend.simulateHover([dustbin.getHandlerId()])
		backend.simulateDrop()
		backend.simulateEndDrag()

		expect(window.alert).toHaveBeenCalledWith('You dropped test into Dustbin!')
	})
})
