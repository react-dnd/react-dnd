import { DragDropManager, DragSource, Unsubscribe } from 'dnd-core'

export default function registerSource(
	type: string,
	source: DragSource,
	manager: DragDropManager<any>,
): {
	handlerId: string
	unregister: Unsubscribe
} {
	const registry = manager.getRegistry()
	const sourceId = registry.addSource(type, source)

	function unregisterSource() {
		registry.removeSource(sourceId)
	}

	return {
		handlerId: sourceId,
		unregister: unregisterSource,
	}
}
