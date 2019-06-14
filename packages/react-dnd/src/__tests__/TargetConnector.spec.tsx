import { TargetConnector } from '../common/TargetConnector'

describe('TargetConnector', () => {
	it('unsubscribes drop target when clearing handler id', () => {
		const backend = {
			setup: jest.fn(),
			teardown: jest.fn(),
			connectDragSource: jest.fn(),
			connectDragPreview: jest.fn(),
			connectDropTarget: jest.fn(),
		}
		const connector = new TargetConnector(backend)
		const unsubscribeDropTarget = jest.fn()
		backend.connectDropTarget.mockReturnValueOnce(unsubscribeDropTarget)

		connector.receiveHandlerId('test')
		connector.hooks.dropTarget()({})
		expect(backend.connectDropTarget).toHaveBeenCalled()
		expect(unsubscribeDropTarget).not.toHaveBeenCalled()
		backend.connectDropTarget.mockClear()

		connector.receiveHandlerId(null)
		expect(backend.connectDropTarget).not.toHaveBeenCalled()
		expect(unsubscribeDropTarget).toHaveBeenCalled()
	})
})
