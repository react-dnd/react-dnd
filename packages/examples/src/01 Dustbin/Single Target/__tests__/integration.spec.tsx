import React from 'react'
import Box from '../Box'
import Dustbin from '../Dustbin'
import { wrapInTestContext } from 'react-dnd-test-utils'
import { mount } from 'enzyme'
import { ContextComponent } from 'react-dnd'
import { TestBackend } from 'react-dnd-test-backend'

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
		const root = mount(<WrappedTestCase />)

		// Obtain a reference to the backend
		const backend = ((root.instance() as ContextComponent<any>)
			.getManager()
			.getBackend() as any) as TestBackend

		// Find the drag source ID and use it to simulate the dragging operation
		const box: any = root.find(Box).instance()
		backend.simulateBeginDrag([box.getHandlerId()])

		window.alert = jest.fn()

		const dustbin: any = root.find(Dustbin).instance()
		backend.simulateHover([dustbin.getHandlerId()])
		backend.simulateDrop()
		backend.simulateEndDrag()

		expect(window.alert).toHaveBeenCalledWith('You dropped test into Dustbin!')
	})
})
