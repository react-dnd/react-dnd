import type { Backend } from 'dnd-core'
import { TargetConnector } from '../TargetConnector.js'

describe('TargetConnector', () => {
	it('unsubscribes drop target when clearing handler id', () => {
		const connectDropTarget = jest.fn()
		const backend: Backend = {
			setup: jest.fn(),
			teardown: jest.fn(),
			connectDragSource: jest.fn(),
			connectDragPreview: jest.fn(),
			connectDropTarget,
			profile: jest.fn(),
		}
		const connector = new TargetConnector(backend)
		const unsubscribeDropTarget = jest.fn()
		connectDropTarget.mockReturnValueOnce(unsubscribeDropTarget)

		connector.receiveHandlerId('test')
		connector.hooks.dropTarget()({})
		expect(backend.connectDropTarget).toHaveBeenCalled()
		expect(unsubscribeDropTarget).not.toHaveBeenCalled()
		connectDropTarget.mockClear()

		connector.receiveHandlerId(null)
		expect(backend.connectDropTarget).not.toHaveBeenCalled()
		expect(unsubscribeDropTarget).toHaveBeenCalled()
	})
})
