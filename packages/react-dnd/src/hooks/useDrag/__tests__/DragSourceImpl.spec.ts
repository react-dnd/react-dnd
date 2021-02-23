import { DragDropMonitor } from 'dnd-core'
import { Connector } from '../../../internals'
import { DragSourceMonitor } from '../../../types'
import { DragSourceImpl } from '../DragSourceImpl'

describe('The Hooks DragSourceImpl', () => {
	const monitor = {} as DragSourceMonitor
	const connector: Connector = {} as any

	describe('canDrag()', () => {
		it('returns true by default', () => {
			const impl = new DragSourceImpl({} as any, monitor, connector)
			expect(impl.canDrag()).toEqual(true)
		})

		it('returns the result of canDrag if it is a boolean', () => {
			let impl = new DragSourceImpl(
				{
					item: { type: 'box' },
					canDrag: true,
				},
				monitor,
				connector,
			)
			expect(impl.canDrag()).toEqual(true)

			impl = new DragSourceImpl(
				{
					item: { type: 'box' },
					canDrag: false,
				},
				monitor,
				connector,
			)
			expect(impl.canDrag()).toEqual(false)
		})

		it('will invoke canDrag if it is a function', () => {
			const impl = new DragSourceImpl(
				{
					canDrag: (m) => {
						expect(m).toEqual(monitor)
						return true
					},
				} as any,
				monitor,
				connector,
			)
			expect(impl.canDrag()).toEqual(true)
		})
	})

	describe('beginDrag()', () => {
		it('returns a drag-item even if an item is not defined in the spec', () => {
			const impl = new DragSourceImpl({} as any, monitor, connector)
			expect(impl.beginDrag()).toEqual({})
		})

		it('returns the dragItem from the spec', () => {
			const item = { type: 'test' }
			const impl = new DragSourceImpl({ item }, monitor, connector)
			expect(impl.beginDrag()).toEqual(item)
		})

		it('will return the result of begin() if it is defined', () => {
			const item = { type: 'test' }
			const item2 = { type: 'test1' }
			const impl = new DragSourceImpl(
				{ item, begin: () => item2 },
				monitor,
				connector,
			)
			expect(impl.beginDrag()).toEqual(item2)
		})

		it('will return the configured item if begin() returns a nullish value', () => {
			const item = { type: 'test' }
			let impl = new DragSourceImpl(
				{ item, begin: () => null },
				monitor,
				connector,
			)
			expect(impl.beginDrag()).toEqual(item)

			impl = new DragSourceImpl(
				{
					item,
					begin: () => undefined,
				},
				monitor,
				connector,
			)
			expect(impl.beginDrag()).toEqual(item)
		})

		it('will return an empty object if begin return a nullish value and item is nullish', () => {
			const impl = new DragSourceImpl(
				{ begin: () => null } as any,
				monitor,
				connector,
			)
			expect(impl.beginDrag()).toEqual({})
		})
	})

	describe('isDragging()', () => {
		it('performs an ID check by default', () => {
			const globalMon = ({
				getSourceId: () => '1',
			} as any) as DragDropMonitor
			const impl = new DragSourceImpl(
				{ item: { type: 'box' } },
				monitor,
				connector,
			)
			expect(impl.isDragging(globalMon, '1')).toBeTruthy()
			expect(impl.isDragging(globalMon, '2')).toBeFalsy()
		})

		it('will invoke isDragging()', () => {
			let impl = new DragSourceImpl(
				{ item: { type: 'box' }, isDragging: () => true },
				monitor,
				connector,
			)
			expect(impl.isDragging(null as any, '1')).toBeTruthy()

			impl = new DragSourceImpl(
				{ item: { type: 'box' }, isDragging: () => false },
				monitor,
				connector,
			)
			expect(impl.isDragging(null as any, '1')).toBeFalsy()
		})
	})

	describe('endDrag()', () => {
		it('will reconnect by default', () => {
			const reconnect = jest.fn()
			const impl = new DragSourceImpl({ item: { type: 'box' } }, monitor, {
				reconnect,
			} as any)
			impl.endDrag()
			expect(reconnect.mock.calls.length).toEqual(1)
		})

		it('will invoke end() in spec before reconnecting ', () => {
			const reconnect = jest.fn()
			const end = jest.fn()
			const item = { x: 1 }
			const impl = new DragSourceImpl(
				{ item: { type: 'box' }, end },
				{
					getItem: () => item,
				} as any,
				{
					reconnect,
				} as any,
			)
			impl.endDrag()
			expect(reconnect.mock.calls.length).toEqual(1)
			expect(end.mock.calls.length).toEqual(1)
			expect(end.mock.calls[0][0]).toEqual(item)
		})
	})
})
