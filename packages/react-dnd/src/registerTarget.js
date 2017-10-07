export default function registerTarget(type, target, manager) {
	const registry = manager.getRegistry()
	const targetId = registry.addTarget(type, target)

	function unregisterTarget() {
		registry.removeTarget(targetId)
	}

	return {
		handlerId: targetId,
		unregister: unregisterTarget,
	}
}
