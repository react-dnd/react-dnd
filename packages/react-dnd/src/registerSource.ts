import { IDragDropManager, IDragSource, Unsubscribe } from 'dnd-core'

export default function registerSource(
	type: string,
	source: IDragSource,
	manager: IDragDropManager<any>,
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
