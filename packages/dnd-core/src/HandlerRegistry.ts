import { Store } from 'redux'
import invariant from 'invariant'
import isArray from 'lodash/isArray'
import asap from 'asap'
import {
	addSource,
	addTarget,
	removeSource,
	removeTarget,
} from './actions/registry'
import getNextUniqueId from './utils/getNextUniqueId'
import { State } from './reducers'
import { DragSource, DropTarget, ItemType } from './interfaces'
import {
	validateSourceContract,
	validateTargetContract,
	validateType,
} from './contracts'

enum HandlerRole {
	SOURCE = 'SOURCE',
	TARGET = 'TARGET',
}

function getNextHandlerId(role: HandlerRole) {
	const id = getNextUniqueId().toString()
	switch (role) {
		case HandlerRole.SOURCE:
			return `S${id}`
		case HandlerRole.TARGET:
			return `T${id}`
		default:
			invariant(false, `Unknown role: ${role}`)
	}
}

function parseRoleFromHandlerId(handlerId) {
	switch (handlerId[0]) {
		case 'S':
			return HandlerRole.SOURCE
		case 'T':
			return HandlerRole.TARGET
		default:
			invariant(false, `Cannot parse handler ID: ${handlerId}`)
	}
}

export default class HandlerRegistry {
	private types: { [id: string]: ItemType }
	private handlers: { [id: string]: DragSource | DropTarget }
	private pinnedSourceId: string
	private pinnedSource: any

	constructor(private store: Store<State>) {
		this.types = {}
		this.handlers = {}

		this.pinnedSourceId = null
		this.pinnedSource = null
	}

	public addSource(type: ItemType, source: DragSource) {
		validateType(type)
		validateSourceContract(source)

		const sourceId = this.addHandler(HandlerRole.SOURCE, type, source)
		this.store.dispatch(addSource(sourceId))
		return sourceId
	}

	public addTarget(type: ItemType, target: DropTarget) {
		validateType(type, true)
		validateTargetContract(target)

		const targetId = this.addHandler(HandlerRole.TARGET, type, target)
		this.store.dispatch(addTarget(targetId))
		return targetId
	}

	private addHandler(role, type, handler) {
		const id = getNextHandlerId(role)
		this.types[id] = type
		this.handlers[id] = handler
		return id
	}

	public containsHandler(handler) {
		return Object.keys(this.handlers).some(
			key => this.handlers[key] === handler,
		)
	}

	public getSource(sourceId, includePinned = false): DragSource {
		invariant(this.isSourceId(sourceId), 'Expected a valid source ID.')

		const isPinned = includePinned && sourceId === this.pinnedSourceId
		const source = isPinned ? this.pinnedSource : this.handlers[sourceId]

		return source
	}

	public getTarget(targetId): DropTarget {
		invariant(this.isTargetId(targetId), 'Expected a valid target ID.')
		return this.handlers[targetId] as DropTarget
	}

	public getSourceType(sourceId) {
		invariant(this.isSourceId(sourceId), 'Expected a valid source ID.')
		return this.types[sourceId]
	}

	public getTargetType(targetId) {
		invariant(this.isTargetId(targetId), 'Expected a valid target ID.')
		return this.types[targetId]
	}

	public isSourceId(handlerId) {
		const role = parseRoleFromHandlerId(handlerId)
		return role === HandlerRole.SOURCE
	}

	public isTargetId(handlerId) {
		const role = parseRoleFromHandlerId(handlerId)
		return role === HandlerRole.TARGET
	}

	public removeSource(sourceId) {
		invariant(this.getSource(sourceId), 'Expected an existing source.')
		this.store.dispatch(removeSource(sourceId))

		asap(() => {
			delete this.handlers[sourceId]
			delete this.types[sourceId]
		})
	}

	public removeTarget(targetId) {
		invariant(this.getTarget(targetId), 'Expected an existing target.')
		this.store.dispatch(removeTarget(targetId))

		asap(() => {
			delete this.handlers[targetId]
			delete this.types[targetId]
		})
	}

	public pinSource(sourceId) {
		const source = this.getSource(sourceId)
		invariant(source, 'Expected an existing source.')

		this.pinnedSourceId = sourceId
		this.pinnedSource = 1
	}

	public unpinSource() {
		invariant(this.pinnedSource, 'No source is pinned at the time.')

		this.pinnedSourceId = null
		this.pinnedSource = null
	}
}
