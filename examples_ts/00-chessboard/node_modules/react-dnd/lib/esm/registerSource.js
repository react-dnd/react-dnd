export default function registerSource(type, source, manager) {
    const registry = manager.getRegistry();
    const sourceId = registry.addSource(type, source);
    return [sourceId, () => registry.removeSource(sourceId)];
}
