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
): [Identifier, Unsubscribe] {
	const registry = manager.getRegistry()
	const sourceId = registry.addSource(type, source)

	return [sourceId, () => registry.removeSource(sourceId)]
}
