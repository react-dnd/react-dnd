import {
	DragDropManager,
	DropTarget,
	Unsubscribe,
	Identifier,
	TargetType,
} from 'dnd-core'

export default function registerTarget<Context>(
	type: TargetType,
	target: DropTarget,
	manager: DragDropManager<Context>,
): [Identifier, Unsubscribe] {
	const registry = manager.getRegistry()
	const targetId = registry.addTarget(type, target)

	return [targetId, () => registry.removeTarget(targetId)]
}
