import { createDragDropManager } from 'dnd-core'

import { TestBackend } from 'react-dnd-test-backend'

import { DropTargetMonitorImpl } from '../DropTargetMonitorImpl.js'

describe('The DropTargetMonitorImpl', () => {
	it('can be constructed', () => {
		const manager = createDragDropManager(TestBackend)
		const monitor = new DropTargetMonitorImpl(manager)
		expect(monitor).toBeDefined()
	})

	it('uses the monitor for canDrop', () => {
		const canDropOnTarget = jest.fn()
		const manager = createDragDropManager(TestBackend)
		manager.getMonitor().canDropOnTarget = canDropOnTarget
		const monitor = new DropTargetMonitorImpl(manager)

		expect(monitor.canDrop()).toEqual(false)
		expect(canDropOnTarget.mock.calls).toHaveLength(0)

		monitor.receiveHandlerId('123')
		monitor.canDrop()
		expect(canDropOnTarget.mock.calls).toHaveLength(1)
		expect(canDropOnTarget.mock.calls[0]).toEqual(['123'])
	})

	it('throws if canDrop is used in a loop', () => {
		const manager = createDragDropManager(TestBackend)
		const monitor = new DropTargetMonitorImpl(manager)
		manager.getMonitor().canDropOnTarget = () => monitor.canDrop()

		monitor.receiveHandlerId('123')
		expect(() => monitor.canDrop()).toThrow(
			'You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor',
		)
	})

	it('uses the monitor for isOver', () => {
		const isOver = jest.fn()
		const manager = createDragDropManager(TestBackend)
		manager.getMonitor().isOverTarget = isOver
		const monitor = new DropTargetMonitorImpl(manager)

		expect(monitor.isOver()).toEqual(false)
		expect(isOver.mock.calls).toHaveLength(0)

		monitor.receiveHandlerId('123')
		monitor.isOver()
		expect(isOver.mock.calls).toHaveLength(1)
		expect(isOver.mock.calls[0]).toEqual(['123', undefined])
	})

	it('thunks to monitor methods', () => {
		const manager = createDragDropManager(TestBackend)
		const monitor = new DropTargetMonitorImpl(manager)

		const THUNK_METHODS = [
			'getItemType',
			'getItem',
			'getDropResult',
			'didDrop',
			'getInitialClientOffset',
			'getInitialSourceClientOffset',
			'getSourceClientOffset',
			'getClientOffset',
			'getDifferenceFromInitialOffset',
		]

		THUNK_METHODS.forEach((method) => {
			const mock = jest.fn()
			;(manager.getMonitor() as any)[method] = mock
			;(monitor as any)[method]()
			expect(mock.mock.calls).toHaveLength(1)
		})
	})
})
