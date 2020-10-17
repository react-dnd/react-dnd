import React from 'react'
import Box from '../Box'
import { wrapInTestContext } from 'react-dnd-test-utils'
import { mount } from 'enzyme'
import { TestBackend } from 'react-dnd-test-backend'
import { ContextComponent } from 'react-dnd'

describe('Box', () => {
	// TODO: test utils are acting wonking with function components.
	// take a pass at making the tests behave better
	it('can be tested independently', () => {
		// Obtain the reference to the component before React DnD wrapping
		const OriginalBox = Box.DecoratedComponent

		// Stub the React DnD connector functions with an identity function
		const identity = (x: any) => x

		// Render with one set of props and test
		let root = mount(
			<OriginalBox
				name="test"
				connectDragSource={identity}
				isDragging={false}
			/>,
		)
		let div = root.getDOMNode() as HTMLDivElement
		expect(div.style.opacity).toEqual('1')

		// Render with another set of props and test
		root = mount(
			<OriginalBox
				name="test"
				connectDragSource={identity}
				isDragging={true}
			/>,
		)
		div = root.getDOMNode() as HTMLDivElement
		expect(div.style.opacity).toEqual('0.4')
	})

	it('can be tested with the testing backend', () => {
		// Render with the testing backend
		const BoxContext = wrapInTestContext(Box)
		const root = mount(<BoxContext name="test" />)

		// Obtain a reference to the backend
		const element = root.instance() as ContextComponent<TestBackend>
		const backend = (element.getManager().getBackend() as any) as TestBackend
		expect(backend).toBeDefined()

		// Check that the opacity is 1
		let div = root.getDOMNode() as HTMLDivElement
		expect(div.style.opacity).toEqual('1')

		// Find the drag source ID and use it to simulate the dragging state
		const box: any = root.find(Box).instance()
		backend.simulateBeginDrag([box.getHandlerId()])

		// Verify that the div changed its opacity
		div = root.getDOMNode() as HTMLDivElement
		expect(div.style.opacity).toEqual('0.4')
	})
})
