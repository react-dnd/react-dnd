import { DropTarget } from 'dnd-core'
import { DropTargetMonitor } from '../../types'
import { DragObjectWithType, DropTargetHookSpec } from '../types'

export class DropTargetImpl<O extends DragObjectWithType, R, P>
	implements DropTarget {
	public constructor(
		public spec: DropTargetHookSpec<O, R, P>,
		private monitor: DropTargetMonitor,
	) {}

	public canDrop() {
		const spec = this.spec
		const monitor = this.monitor
		return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true
	}

	public hover() {
		const spec = this.spec
		const monitor = this.monitor
		if (spec.hover) {
			spec.hover(monitor.getItem(), monitor)
		}
	}

	public drop() {
		const spec = this.spec
		const monitor = this.monitor
		if (spec.drop) {
			return spec.drop(monitor.getItem(), monitor)
		}
	}
}
