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
): { handlerId: Identifier; unregister: Unsubscribe } {
	const registry = manager.getRegistry()
	const targetId = registry.addTarget(type, target)

	return {
		handlerId: targetId,
		unregister: () => registry.removeTarget(targetId),
	}
}
