declare var require: any
import * as React from 'react'
import wrapConnectorHooks from './wrapConnectorHooks'
import { Backend, Unsubscribe, Identifier } from 'dnd-core'
import { isRef } from './utils/isRef'
const shallowEqual = require('shallowequal')

import { Connector } from './SourceConnector'

export default class TargetConnector implements Connector {
	private handlerId: Identifier | null = null
	// The drop target may either be attached via ref or connect function
	private dropTargetRef: React.RefObject<any> | null = null
	private dropTargetNode: any
	private dropTargetOptionsInternal: any = null
	private disconnectDropTarget: Unsubscribe | undefined

	private lastConnectedHandlerId: Identifier | null = null
	private lastConnectedDropTarget: any = null
	private lastConnectedDropTargetOptions: any = null

	constructor(private backend: Backend) {}

	public get hooks() {
		return wrapConnectorHooks({
			dropTarget: (node: any, options: any) => {
				this.dropTargetOptions = options
				if (isRef(node)) {
					this.dropTargetRef = node
				} else {
					this.dropTargetNode = node
				}
			},
		})
	}

	public get connectTarget() {
		return this.dropTarget
	}

	public reconnect() {
		const dropTarget = this.dropTarget
		if (!this.handlerId || !dropTarget) {
			return
		}
		// if nothing has changed then don't resubscribe
		if (
			this.lastConnectedHandlerId !== this.handlerId ||
			this.lastConnectedDropTarget !== dropTarget ||
			!shallowEqual(this.lastConnectedDropTargetOptions, this.dropTargetOptions)
		) {
			if (this.disconnectDropTarget) {
				this.disconnectDropTarget()
				this.disconnectDropTarget = undefined
			}
			this.lastConnectedHandlerId = this.handlerId
			this.lastConnectedDropTarget = dropTarget
			this.lastConnectedDropTargetOptions = this.dropTargetOptions

			this.disconnectDropTarget = this.backend.connectDropTarget(
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

	private get dropTarget() {
		return (
			this.dropTargetNode || (this.dropTargetRef && this.dropTargetRef.current)
		)
	}
}
