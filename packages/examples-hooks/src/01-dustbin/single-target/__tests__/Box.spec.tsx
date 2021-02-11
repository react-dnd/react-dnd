import { Box } from '../Box'
import { wrapInTestContext } from 'react-dnd-test-utils'
import { Identifier } from 'dnd-core'
import { mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

describe('Box', () => {
	it('can be tested with the testing backend', () => {
		// Render with the testing backend
		const [BoxContext, getBackend] = wrapInTestContext(Box)
		const root = mount(<BoxContext name="test" />)

		// Check that the opacity is 1
		const div = (root.getDOMNode() as any) as HTMLDivElement
		expect(div).toBeDefined()
		expect(div.style.opacity).toEqual('1')

		// Find the drag source ID and use it to simulate the dragging state
		const box: any = root.find(Box)
		const getHandlerId = (c: any): Identifier =>
			c.find('[data-handler-id]').props()['data-handler-id']

		act(() => {
			getBackend().simulateBeginDrag([getHandlerId(box)])
		})

		// Verify that the div changed its opacity
		expect(div.style.opacity).toEqual('0.4')
	})
})
