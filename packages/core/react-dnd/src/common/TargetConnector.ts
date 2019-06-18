import * as React from 'react'
import shallowEqual from 'shallowequal'
import wrapConnectorHooks from './wrapConnectorHooks'
import { Backend, Unsubscribe, Identifier } from 'dnd-core'
import { isRef } from '../utils/isRef'
import { Connector } from './SourceConnector'

export class TargetConnector implements Connector {
	public hooks = wrapConnectorHooks({
		dropTarget: (node: any, options: any) => {
			this.dropTargetOptions = options
			if (isRef(node)) {
				this.dropTargetRef = node
			} else {
				this.dropTargetNode = node
			}
			this.reconnect()
		},
	})

	private handlerId: Identifier | null = null
	// The drop target may either be attached via ref or connect function
	private dropTargetRef: React.RefObject<any> | null = null
	private dropTargetNode: any
	private dropTargetOptionsInternal: any = null
	private unsubscribeDropTarget: Unsubscribe | undefined

	private lastConnectedHandlerId: Identifier | null = null
	private lastConnectedDropTarget: any = null
	private lastConnectedDropTargetOptions: any = null

	public constructor(private backend: Backend) {}

	public get connectTarget() {
		return this.dropTarget
	}

	public reconnect() {
		// if nothing has changed then don't resubscribe
		const didChange =
			this.didHandlerIdChange() ||
			this.didDropTargetChange() ||
			this.didOptionsChange()

		if (didChange) {
			this.disconnectDropTarget()
		}

		const dropTarget = this.dropTarget
		if (!this.handlerId) {
			return
		}
		if (!dropTarget) {
			this.lastConnectedDropTarget = dropTarget
			return
		}

		if (didChange) {
			this.lastConnectedHandlerId = this.handlerId
			this.lastConnectedDropTarget = dropTarget
			this.lastConnectedDropTargetOptions = this.dropTargetOptions

			this.unsubscribeDropTarget = this.backend.connectDropTarget(
				this.handlerId,
				dropTarget,
				this.dropTargetOptions,
			)
		}
	}

	public receiveHandlerId(newHandlerId: Identifier | null) {
		if (newHandlerId === this.handlerId) {
			return
		}

		this.handlerId = newHandlerId
		this.reconnect()
	}

	public get dropTargetOptions() {
		return this.dropTargetOptionsInternal
	}
	public set dropTargetOptions(options: any) {
		this.dropTargetOptionsInternal = options
	}

	private didHandlerIdChange(): boolean {
		return this.lastConnectedHandlerId !== this.handlerId
	}

	private didDropTargetChange(): boolean {
		return this.lastConnectedDropTarget !== this.dropTarget
	}

	private didOptionsChange(): boolean {
		return !shallowEqual(
			this.lastConnectedDropTargetOptions,
			this.dropTargetOptions,
		)
	}

	private disconnectDropTarget() {
		if (this.unsubscribeDropTarget) {
			this.unsubscribeDropTarget()
			this.unsubscribeDropTarget = undefined
		}
	}

	private get dropTarget() {
		return (
			this.dropTargetNode || (this.dropTargetRef && this.dropTargetRef.current)
		)
	}
}
