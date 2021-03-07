import { invariant } from '@react-dnd/invariant'
import { DragDropMonitor, DragSource, Identifier } from 'dnd-core'
import { Connector } from '../../internals'
import { DragSourceMonitor } from '../../types'
import { DragObjectFactory, DragSourceHookSpec } from '../types'

export class DragSourceImpl<O, R, P> implements DragSource {
	public constructor(
		public spec: DragSourceHookSpec<O, R, P>,
		private monitor: DragSourceMonitor<O, R>,
		private connector: Connector,
	) {}

	public beginDrag() {
		const spec = this.spec
		const monitor = this.monitor
		const { item, begin } = spec

		let result: O | null = null

		// Use .item by default
		if (typeof spec.item === 'object') {
			return spec.item as O
		} else if (typeof spec.item === 'function') {
			return (spec.item as DragObjectFactory<O>)(monitor)
		} else if (typeof spec.begin === 'function') {
			const beginResult = spec.begin(monitor)
			if (beginResult != null) {
				result = beginResult
			}
		}

		invariant(
			item != null,
			`dragSpec must declare or generate a dragItem in spec.item, spec.item(), or spec.begin()`,
		)
		return result
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
