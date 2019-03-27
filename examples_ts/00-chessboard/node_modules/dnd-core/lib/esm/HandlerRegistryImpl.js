import { addSource, addTarget, removeSource, removeTarget, } from './actions/registry';
import getNextUniqueId from './utils/getNextUniqueId';
import { HandlerRole, } from './interfaces';
import { validateSourceContract, validateTargetContract, validateType, } from './contracts';
const invariant = require('invariant');
const asap = require('asap');
function getNextHandlerId(role) {
    const id = getNextUniqueId().toString();
    switch (role) {
        case HandlerRole.SOURCE:
            return `S${id}`;
        case HandlerRole.TARGET:
            return `T${id}`;
        default:
            throw new Error(`Unknown Handler Role: ${role}`);
    }
}
function parseRoleFromHandlerId(handlerId) {
    switch (handlerId[0]) {
        case 'S':
            return HandlerRole.SOURCE;
        case 'T':
            return HandlerRole.TARGET;
        default:
            invariant(false, `Cannot parse handler ID: ${handlerId}`);
    }
}
function mapContainsValue(map, searchValue) {
    const entries = map.entries();
    let isDone = false;
    do {
        const { done, value: [, value], } = entries.next();
        if (value === searchValue) {
            return true;
        }
        isDone = done;
    } while (!isDone);
    return false;
}
export default class HandlerRegistryImpl {
    constructor(store) {
        this.store = store;
        this.types = new Map();
        this.dragSources = new Map();
        this.dropTargets = new Map();
        this.pinnedSourceId = null;
        this.pinnedSource = null;
    }
    addSource(type, source) {
        validateType(type);
        validateSourceContract(source);
        const sourceId = this.addHandler(HandlerRole.SOURCE, type, source);
        this.store.dispatch(addSource(sourceId));
        return sourceId;
    }
    addTarget(type, target) {
        validateType(type, true);
        validateTargetContract(target);
        const targetId = this.addHandler(HandlerRole.TARGET, type, target);
        this.store.dispatch(addTarget(targetId));
        return targetId;
    }
    containsHandler(handler) {
        return (mapContainsValue(this.dragSources, handler) ||
            mapContainsValue(this.dropTargets, handler));
    }
    getSource(sourceId, includePinned = false) {
        invariant(this.isSourceId(sourceId), 'Expected a valid source ID.');
        const isPinned = includePinned && sourceId === this.pinnedSourceId;
        const source = isPinned ? this.pinnedSource : this.dragSources.get(sourceId);
        return source;
    }
    getTarget(targetId) {
        invariant(this.isTargetId(targetId), 'Expected a valid target ID.');
        return this.dropTargets.get(targetId);
    }
    getSourceType(sourceId) {
        invariant(this.isSourceId(sourceId), 'Expected a valid source ID.');
        return this.types.get(sourceId);
    }
    getTargetType(targetId) {
        invariant(this.isTargetId(targetId), 'Expected a valid target ID.');
        return this.types.get(targetId);
    }
    isSourceId(handlerId) {
        const role = parseRoleFromHandlerId(handlerId);
        return role === HandlerRole.SOURCE;
    }
    isTargetId(handlerId) {
        const role = parseRoleFromHandlerId(handlerId);
        return role === HandlerRole.TARGET;
    }
    removeSource(sourceId) {
        invariant(this.getSource(sourceId), 'Expected an existing source.');
        this.store.dispatch(removeSource(sourceId));
        asap(() => {
            this.dragSources.delete(sourceId);
            this.types.delete(sourceId);
        });
    }
    removeTarget(targetId) {
        invariant(this.getTarget(targetId), 'Expected an existing target.');
        this.store.dispatch(removeTarget(targetId));
        this.dropTargets.delete(targetId);
        this.types.delete(targetId);
    }
    pinSource(sourceId) {
        const source = this.getSource(sourceId);
        invariant(source, 'Expected an existing source.');
        this.pinnedSourceId = sourceId;
        this.pinnedSource = source;
    }
    unpinSource() {
        invariant(this.pinnedSource, 'No source is pinned at the time.');
        this.pinnedSourceId = null;
        this.pinnedSource = null;
    }
    addHandler(role, type, handler) {
        const id = getNextHandlerId(role);
        this.types.set(id, type);
        if (role === HandlerRole.SOURCE) {
            this.dragSources.set(id, handler);
        }
        else if (role === HandlerRole.TARGET) {
            this.dropTargets.set(id, handler);
        }
        return id;
    }
}
