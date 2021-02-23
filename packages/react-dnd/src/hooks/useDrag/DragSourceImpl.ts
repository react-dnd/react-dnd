import { invariant } from '@react-dnd/invariant'
import { DragDropMonitor, DragSource, Identifier } from 'dnd-core'
import { Connector } from '../../internals'
import { DragSourceMonitor } from '../../types'
import { DragObjectWithType, DragSourceHookSpec } from '../types'

export class DragSourceImpl<O extends DragObjectWithType, R, P>
	implements DragSource {
	public constructor(
		public spec: DragSourceHookSpec<O, R, P>,
		private monitor: DragSourceMonitor,
		private connector: Connector,
	) {}

	public beginDrag() {
		const spec = this.spec
		const monitor = this.monitor
		const { begin, item } = spec
		if (begin) {
			const beginResult = begin(monitor)
			invariant(
				beginResult == null || typeof beginResult === 'object',
				'dragSpec.begin() must either return an object, undefined, or null',
			)
			return beginResult || item || {}
		}
		return item || {}
	}

	public canDrag() {
		const spec = this.spec
		const monitor = this.monitor
		if (typeof spec.canDrag === 'boolean') {
			return spec.canDrag
		} else if (typeof spec.canDrag === 'function') {
			return spec.canDrag(monitor)
		} else {
			return true
		}
	}

	public isDragging(globalMonitor: DragDropMonitor, target: Identifier) {
		const spec = this.spec
		const monitor = this.monitor
		const { isDragging } = spec
		return isDragging
			? isDragging(monitor)
			: target === globalMonitor.getSourceId()
	}

	public endDrag() {
		const spec = this.spec
		const monitor = this.monitor
		const connector = this.connector
		const { end } = spec
		if (end) {
			end(monitor.getItem(), monitor)
		}
		connector.reconnect()
	}
}
