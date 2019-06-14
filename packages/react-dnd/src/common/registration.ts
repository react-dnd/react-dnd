import {
	DragDropManager,
	DropTarget,
	Unsubscribe,
	Identifier,
	TargetType,
	SourceType,
	DragSource,
} from 'dnd-core'

export function registerTarget<Context>(
	type: TargetType,
	target: DropTarget,
	manager: DragDropManager<Context>,
): [Identifier, Unsubscribe] {
	const registry = manager.getRegistry()
	const targetId = registry.addTarget(type, target)

	return [targetId, () => registry.removeTarget(targetId)]
}

export function registerSource<Context>(
	type: SourceType,
	source: DragSource,
	manager: DragDropManager<Context>,
): [Identifier, Unsubscribe] {
	const registry = manager.getRegistry()
	const sourceId = registry.addSource(type, source)

	return [sourceId, () => registry.removeSource(sourceId)]
}
