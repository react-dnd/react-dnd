declare var require: any
import * as React from 'react'
import wrapConnectorHooks from './wrapConnectorHooks'
import { Backend, Unsubscribe, Identifier } from 'dnd-core'
import { isRef } from './hooks/util'
const shallowEqual = require('shallowequal')

export default function createTargetConnector(backend: Backend) {
	let handlerId: Identifier
	// The drop target may either be attached via ref or connect function
	let dropTargetRef: React.RefObject<any> | null = null
	let dropTargetNode: any
	let dropTargetOptions: any
	let disconnectDropTarget: Unsubscribe | undefined

	let lastConnectedHandlerId: Identifier | null = null
	let lastConnectedDropTarget: any = null
	let lastConnectedDropTargetOptions: any = null

	function reconnectDropTarget() {
		const dropTarget =
			dropTargetNode || (dropTargetRef && dropTargetRef.current)
		if (!handlerId || !dropTarget) {
			return
		}
		// if nothing has changed then don't resubscribe
		if (
			lastConnectedHandlerId !== handlerId ||
			lastConnectedDropTarget !== dropTarget ||
			!shallowEqual(lastConnectedDropTargetOptions, dropTargetOptions)
		) {
			if (disconnectDropTarget) {
				disconnectDropTarget()
				disconnectDropTarget = undefined
			}
			lastConnectedHandlerId = handlerId
			lastConnectedDropTarget = dropTarget
			lastConnectedDropTargetOptions = dropTargetOptions

			disconnectDropTarget = backend.connectDropTarget(
				handlerId,
				dropTarget,
				dropTargetOptions,
			)
		}
	}

	function receiveHandlerId(newHandlerId: Identifier) {
		if (newHandlerId === handlerId) {
			return
		}

		handlerId = newHandlerId
		reconnectDropTarget()
	}

	return {
		receiveHandlerId,
		hooks: wrapConnectorHooks({
			get dropTargetRef() {
				if (dropTargetRef == null) {
					dropTargetRef = React.createRef()
				}
				return dropTargetRef
			},
			dropTarget: (node: any, options: any) => {
				dropTargetOptions = options
				if (isRef(node)) {
					dropTargetRef = node
				} else {
					dropTargetNode = node
				}
			},
			dropTargetOptions: (options?: any) => (dropTargetOptions = options),
		}),
		reconnect: reconnectDropTarget,
	}
}
