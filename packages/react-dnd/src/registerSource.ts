import { DragDropManager, DragSource, Unsubscribe } from 'dnd-core'

export default function registerSource<Context>(
	type: string,
	source: DragSource,
	manager: DragDropManager<Context>,
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
