import { Store } from 'redux'
import invariant from 'invariant'
import isArray from 'lodash/isArray'
const asap = require('asap')
import {
	addSource,
	addTarget,
	removeSource,
	removeTarget,
} from './actions/registry'
import getNextUniqueId from './utils/getNextUniqueId'
import { IState } from './reducers'
import {
	IDragSource,
	IDropTarget,
	ItemType,
	HandlerRole,
	IHandlerRegistry,
} from './interfaces'
import {
	validateSourceContract,
	validateTargetContract,
	validateType,
} from './contracts'

function getNextHandlerId(role: HandlerRole): string {
	const id = getNextUniqueId().toString()
	switch (role) {
		case HandlerRole.SOURCE:
			return `S${id}`
		case HandlerRole.TARGET:
			return `T${id}`
		default:
			throw new Error(`Unknown Handler Role: ${role}`)
	}
}

function parseRoleFromHandlerId(handlerId: string) {
	switch (handlerId[0]) {
		case 'S':
			return HandlerRole.SOURCE
		case 'T':
			return HandlerRole.TARGET
		default:
			invariant(false, `Cannot parse handler ID: ${handlerId}`)
	}
}

export default class HandlerRegistry implements IHandlerRegistry {
	private types: { [id: string]: ItemType } = {}
	private dragSources: { [id: string]: IDragSource } = {}
	private dropTargets: { [id: string]: IDropTarget } = {}
	private pinnedSourceId: string | null = null
	private pinnedSource: any = null

	constructor(private store: Store<IState>) {}

	public addSource(type: string, source: IDragSource) {
		validateType(type)
		validateSourceContract(source)

		const sourceId = this.addHandler(HandlerRole.SOURCE, type, source)
		this.store.dispatch(addSource(sourceId))
		return sourceId
	}

	public addTarget(type: string, target: IDropTarget) {
		validateType(type, true)
		validateTargetContract(target)

		const targetId = this.addHandler(HandlerRole.TARGET, type, target)
		this.store.dispatch(addTarget(targetId))
		return targetId
	}

	public containsHandler(handler: IDragSource | IDropTarget) {
		return (
			Object.keys(this.dragSources).some(
				key => this.dragSources[key] === handler,
			) ||
			Object.keys(this.dropTargets).some(
				key => this.dropTargets[key] === handler,
			)
		)
	}

	public getSource(sourceId: string, includePinned = false): IDragSource {
		invariant(this.isSourceId(sourceId), 'Expected a valid source ID.')

		const isPinned = includePinned && sourceId === this.pinnedSourceId

		const source = isPinned ? this.pinnedSource : this.dragSources[sourceId]
		return source
	}

	public getTarget(targetId: string): IDropTarget {
		invariant(this.isTargetId(targetId), 'Expected a valid target ID.')
		return this.dropTargets[targetId] as IDropTarget
	}

	public getSourceType(sourceId: string): ItemType {
		invariant(this.isSourceId(sourceId), 'Expected a valid source ID.')
		return this.types[sourceId]
	}

	public getTargetType(targetId: string) {
		invariant(this.isTargetId(targetId), 'Expected a valid target ID.')
		return this.types[targetId]
	}

	public isSourceId(handlerId: string) {
		const role = parseRoleFromHandlerId(handlerId)
		return role === HandlerRole.SOURCE
	}

	public isTargetId(handlerId: string) {
		const role = parseRoleFromHandlerId(handlerId)
		return role === HandlerRole.TARGET
	}

	public removeSource(sourceId: string) {
		invariant(this.getSource(sourceId), 'Expected an existing source.')
		this.store.dispatch(removeSource(sourceId))

		asap(() => {
			delete this.dragSources[sourceId]
			delete this.types[sourceId]
		})
	}

	public removeTarget(targetId: string) {
		invariant(this.getTarget(targetId), 'Expected an existing target.')
		this.store.dispatch(removeTarget(targetId))

		asap(() => {
			delete this.dropTargets[targetId]
			delete this.types[targetId]
		})
	}

	public pinSource(sourceId: string) {
		const source = this.getSource(sourceId)
		invariant(source, 'Expected an existing source.')

		this.pinnedSourceId = sourceId
		this.pinnedSource = source
	}

	public unpinSource() {
		invariant(this.pinnedSource, 'No source is pinned at the time.')

		this.pinnedSourceId = null
		this.pinnedSource = null
	}

	private addHandler(
		role: HandlerRole,
		type: string,
		handler: IDragSource | IDropTarget,
	): string {
		const id = getNextHandlerId(role)
		this.types[id] = type
		if (role === HandlerRole.SOURCE) {
			this.dragSources[id] = handler as IDragSource
		} else if (role === HandlerRole.TARGET) {
			this.dropTargets[id] = handler as IDropTarget
		}
		return id
	}
}
