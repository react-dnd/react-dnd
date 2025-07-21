import type { Backend } from 'dnd-core'


import { SourceConnector } from '../SourceConnector.js'

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
			profile: jest.fn(),
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

	it('handles disconnect and immediate reconnect', () => {
		const unsubscribeDragSource = jest.fn()
		const unsubscribeDragPreview = jest.fn()
		backend.connectDragSource.mockReturnValue(unsubscribeDragSource)
		backend.connectDragPreview.mockReturnValue(unsubscribeDragPreview)

		connector.receiveHandlerId('test')
		connector.hooks.dragSource()({})
		connector.hooks.dragPreview()({})
		expect(backend.connectDragSource).toHaveBeenCalled()
		expect(backend.connectDragPreview).toHaveBeenCalled()
		expect(unsubscribeDragSource).not.toHaveBeenCalled()
		expect(unsubscribeDragPreview).not.toHaveBeenCalled()
		backend.connectDragSource.mockClear()
		backend.connectDragPreview.mockClear()

		connector.disconnectDragSource()
		connector.disconnectDragPreview()
		expect(backend.connectDragSource).not.toHaveBeenCalled()
		expect(backend.connectDragPreview).not.toHaveBeenCalled()
		expect(unsubscribeDragSource).toHaveBeenCalled()
		expect(unsubscribeDragPreview).toHaveBeenCalled()
		unsubscribeDragSource.mockClear()
		unsubscribeDragPreview.mockClear()

		// Source & preview should be connected after disconnect
		connector.reconnect()
		expect(backend.connectDragSource).toHaveBeenCalled()
		expect(backend.connectDragPreview).toHaveBeenCalled()
		expect(unsubscribeDragSource).not.toHaveBeenCalled()
		expect(unsubscribeDragPreview).not.toHaveBeenCalled()
		backend.connectDragSource.mockClear()
		backend.connectDragPreview.mockClear()

		// Source & preview should not be connected a second time
		connector.reconnect()
		expect(backend.connectDragSource).not.toHaveBeenCalled()
		expect(backend.connectDragPreview).not.toHaveBeenCalled()
		expect(unsubscribeDragSource).not.toHaveBeenCalled()
		expect(unsubscribeDragPreview).not.toHaveBeenCalled()
	})

	it('unsubscribes drag preview when hook is called without node', () => {
		const unsubscribeDragSource = jest.fn()
		backend.connectDragSource.mockReturnValueOnce(unsubscribeDragSource)

		connector.receiveHandlerId('test')
		connector.hooks.dragSource()({})
		expect(backend.connectDragSource).toHaveBeenCalled()
		expect(unsubscribeDragSource).not.toHaveBeenCalled()
		backend.connectDragSource.mockClear()

		connector.hooks.dragSource()(null)
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

	it('unsubscribes drag preview when hook called without node', () => {
		const unsubscribeDragPreview = jest.fn()
		backend.connectDragPreview.mockReturnValueOnce(unsubscribeDragPreview)

		connector.receiveHandlerId('test')
		connector.hooks.dragPreview()({})
		expect(backend.connectDragPreview).toHaveBeenCalled()
		expect(unsubscribeDragPreview).not.toHaveBeenCalled()
		backend.connectDragPreview.mockClear()

		connector.hooks.dragPreview()(null)
		expect(backend.connectDragPreview).not.toHaveBeenCalled()
		expect(unsubscribeDragPreview).toHaveBeenCalled()
	})
})
