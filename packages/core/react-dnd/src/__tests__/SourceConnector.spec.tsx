import { SourceConnector } from '../common/SourceConnector'
import { Backend } from 'dnd-core'

describe('SourceConnector', () => {
	let backend: jest.Mocked<Backend>
	let connector: SourceConnector

	beforeEach(() => {
		backend = {
			setup: jest.fn(),
			teardown: jest.fn(),
			connectDragSource: jest.fn(),
			connectDragPreview: jest.fn(),
			connectDropTarget: jest.fn(),
		}
		connector = new SourceConnector(backend)
	})

	it('unsubscribes drag source when clearing handler id', () => {
		const unsubscribeDragSource = jest.fn()
		backend.connectDragSource.mockReturnValueOnce(unsubscribeDragSource)

		connector.receiveHandlerId('test')
		connector.hooks.dragSource()({})
		expect(backend.connectDragSource).toHaveBeenCalled()
		expect(unsubscribeDragSource).not.toHaveBeenCalled()
		backend.connectDragSource.mockClear()

		connector.receiveHandlerId(null)
		expect(backend.connectDragSource).not.toHaveBeenCalled()
		expect(unsubscribeDragSource).toHaveBeenCalled()
	})

	it('unsubscribes drag preview when clearing handler id', () => {
		const unsubscribeDragPreview = jest.fn()
		backend.connectDragPreview.mockReturnValueOnce(unsubscribeDragPreview)

		connector.receiveHandlerId('test')
		connector.hooks.dragPreview()({})
		expect(backend.connectDragPreview).toHaveBeenCalled()
		expect(unsubscribeDragPreview).not.toHaveBeenCalled()
		backend.connectDragPreview.mockClear()

		connector.receiveHandlerId(null)
		expect(backend.connectDragPreview).not.toHaveBeenCalled()
		expect(unsubscribeDragPreview).toHaveBeenCalled()
	})
})
