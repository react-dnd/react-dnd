import { createDragDropManager } from 'dnd-core'

import { TestBackend } from 'react-dnd-test-backend'

import { DragSourceMonitorImpl } from '../DragSourceMonitorImpl.js'

describe('The DragSourceMonitorImpl', () => {
	it('can be constructed', () => {
		const manager = createDragDropManager(TestBackend)
		const monitor = new DragSourceMonitorImpl(manager)
		expect(monitor).toBeDefined()
	})

	it('uses the monitor for canDrag', () => {
		const canDragSource = jest.fn()
		const manager = createDragDropManager(TestBackend)
		manager.getMonitor().canDragSource = canDragSource
		const monitor = new DragSourceMonitorImpl(manager)

		monitor.canDragSource('123')
		expect(canDragSource.mock.calls).toHaveLength(1)
		expect(canDragSource.mock.calls[0]).toEqual(['123'])
	})

	it('throws if canDrag is used in a loop', () => {
		const manager = createDragDropManager(TestBackend)
		const monitor = new DragSourceMonitorImpl(manager)
		manager.getMonitor().canDragSource = (a: any) => (monitor as any).canDrag(a)

		expect(() => monitor.canDragSource('123')).toThrow(
			'You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor',
		)
	})

	it('thunks to monitor methods', () => {
		const manager = createDragDropManager(TestBackend)
		const monitor = new DragSourceMonitorImpl(manager)

		const THUNK_METHODS = [
			'getTargetIds',
			'isSourcePublic',
			'getSourceId',
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
