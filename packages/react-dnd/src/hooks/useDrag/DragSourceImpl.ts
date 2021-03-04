import { invariant } from '@react-dnd/invariant'
import { DragDropMonitor, DragSource, Identifier } from 'dnd-core'
import { Connector } from '../../internals'
import { DragSourceMonitor } from '../../types'
import { DragObjectFactory, DragSourceHookSpec } from '../types'

export class DragSourceImpl<O, P> implements DragSource {
	public constructor(
		public spec: DragSourceHookSpec<O, P>,
		private monitor: DragSourceMonitor,
		private connector: Connector,
	) {}

	public beginDrag() {
		const spec = this.spec
		const monitor = this.monitor
		const { item } = spec

		invariant(
			typeof item === 'undefined' ||
				typeof item === 'function' ||
				typeof item === 'object',
			'dragSpec.item() must either be an object or a function',
		)

		let result: O | null = null
		if (typeof item === 'function') {
			result = (item as DragObjectFactory<O>)(monitor)
			invariant(
				result == null || typeof result === 'object',
				'dragSpec.item() must either return an object, undefined, or null',
			)
		} else if (typeof item == 'object') {
			result = item as O
		} else {
			// This is useful in the scenario when the user defines spec.type, but not spec.item
			result = {} as O
		}

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
