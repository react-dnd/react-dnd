export default function registerTarget(type, target, manager) {
    const registry = manager.getRegistry();
    const targetId = registry.addTarget(type, target);
    return [targetId, () => registry.removeTarget(targetId)];
}
