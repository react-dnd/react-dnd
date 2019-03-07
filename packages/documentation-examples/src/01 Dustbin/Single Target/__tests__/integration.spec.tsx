import * as React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import wrapInTestContext from '../../../shared/wrapInTestContext'
import Box from '../Box'
import Dustbin from '../Dustbin'

describe('Integration', () => {
	it('can simulate a full drag and drop interaction', () => {
		function DustbinWithBox() {
			return (
				<div>
					<Dustbin />
					<Box name="test" />
				</div>
			)
		}

		// Render with the test context that uses the test backend
		const DustbinWithBoxContext = wrapInTestContext(DustbinWithBox)
		const root: any = TestUtils.renderIntoDocument(<DustbinWithBoxContext />)

		// Obtain a reference to the backend
		const backend = root.getManager().getBackend()

		// Find the drag source ID and use it to simulate the dragging operation
		const box: any = TestUtils.findRenderedComponentWithType(root, Box as any)
		backend.simulateBeginDrag([box.getHandlerId()])

		window.alert = jest.fn()

		const dustbin: any = TestUtils.findRenderedComponentWithType(
			root,
			Dustbin as any,
		)
		backend.simulateHover([dustbin.getHandlerId()])
		backend.simulateDrop()
		backend.simulateEndDrag()

		expect(window.alert).toHaveBeenCalledWith('You dropped test into Dustbin!')
	})
})
