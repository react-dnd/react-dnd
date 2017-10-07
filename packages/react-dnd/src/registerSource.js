export default function registerSource(type, source, manager) {
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
