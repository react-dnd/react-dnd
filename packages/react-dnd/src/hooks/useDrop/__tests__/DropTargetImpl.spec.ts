import { DropTargetMonitor } from '../../../types'
import { DropTargetImpl } from '../DropTargetImpl'

describe('The Hooks DropTargetImpl', () => {
	it('can determine if a item can drag', () => {
		const monitor = {
			getItem: () => ({}),
		} as DropTargetMonitor
		let impl = new DropTargetImpl({} as any, monitor)
		expect(impl.canDrop()).toEqual(true)

		impl = new DropTargetImpl(
			{
				canDrop(item, mon) {
					expect(mon).toEqual(monitor)
					return false
				},
			} as any,
			monitor,
		)
		expect(impl.canDrop()).toEqual(false)
	})
})
