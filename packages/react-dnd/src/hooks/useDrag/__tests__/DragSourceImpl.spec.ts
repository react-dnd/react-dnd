import { DragSourceMonitor } from '../../../types'
import { DragSourceImpl } from '../DragSourceImpl'

describe('The Hooks DragSourceImpl', () => {
	it('can determine if a item can drag', () => {
		const monitor = {} as DragSourceMonitor
		let impl = new DragSourceImpl(
			{
				canDrag: true,
			} as any,
			monitor,
			{} as any,
		)
		expect(impl.canDrag()).toEqual(true)

		impl = new DragSourceImpl(
			{
				canDrag: false,
			} as any,
			monitor,
			{} as any,
		)
		expect(impl.canDrag()).toEqual(false)

		impl = new DragSourceImpl(
			{
				canDrag: (m) => {
					expect(m).toEqual(monitor)
					return true
				},
			} as any,
			monitor,
			{} as any,
		)
		expect(impl.canDrag()).toEqual(true)
	})
})
