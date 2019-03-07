import {
	DragDropManager,
	DragSource,
	Unsubscribe,
	Identifier,
	SourceType,
} from 'dnd-core'

export default function registerSource<Context>(
	type: SourceType,
	source: DragSource,
	manager: DragDropManager<Context>,
): {
	handlerId: Identifier
	unregister: Unsubscribe
} {
	const registry = manager.getRegistry()
	const sourceId = registry.addSource(type, source)

	return {
		handlerId: sourceId,
		unregister: () => registry.removeSource(sourceId),
	}
}
