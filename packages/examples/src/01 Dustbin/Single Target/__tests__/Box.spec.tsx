import React from 'react'
import * as TestUtils from 'react-dom/test-utils'
import Box from '../Box'
import { wrapInTestContext } from 'react-dnd-test-utils'

class Wrapper extends React.Component {
	public render() {
		return this.props.children
	}
}
describe('Box', () => {
	// TODO: test utils are acting wonking with function components.
	// take a pass at making the tests behave better
	it.skip('can be tested independently', () => {
		// Obtain the reference to the component before React DnD wrapping
		const OriginalBox = Box.DecoratedComponent

		// Stub the React DnD connector functions with an identity function
		const identity = (x: any) => x

		const TestCase: React.FC = () => (
			<Wrapper>
				<OriginalBox
					name="test"
					connectDragSource={identity}
					isDragging={false}
				/>
			</Wrapper>
		)

		// Render with one set of props and test
		let root: any = TestUtils.renderIntoDocument(<TestCase />)
		let div: HTMLDivElement = TestUtils.findRenderedDOMComponentWithTag(
			root,
			'div,',
		) as HTMLDivElement
		expect(div.style.opacity).toEqual('1')

		// Render with another set of props and test
		root = TestUtils.renderIntoDocument(
			<OriginalBox
				name="test"
				connectDragSource={identity}
				isDragging={true}
			/>,
		)
		div = TestUtils.findRenderedDOMComponentWithTag(
			root,
			'div',
		) as HTMLDivElement
		expect(div.style.opacity).toEqual('0.4')
	})

	it('can be tested with the testing backend', () => {
		// Render with the testing backend
		const BoxContext = wrapInTestContext(Box)
		const root: any = TestUtils.renderIntoDocument(<BoxContext name="test" />)

		// Obtain a reference to the backend
		const backend = root.getManager().getBackend()

		// Check that the opacity is 1
		let div: any = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
		expect(div.style.opacity).toEqual('1')

		// Find the drag source ID and use it to simulate the dragging state
		const box: any = TestUtils.findRenderedComponentWithType(root, Box as any)
		backend.simulateBeginDrag([box.getHandlerId()])

		// Verify that the div changed its opacity
		div = TestUtils.findRenderedDOMComponentWithTag(root, 'div')
		expect(div.style.opacity).toEqual('0.4')
	})
})
