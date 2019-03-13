import * as React from 'react'
import wrapConnectorHooks from './wrapConnectorHooks'
import { Backend, Unsubscribe, Identifier } from 'dnd-core'
import { isRef } from './hooks/util'

export default function createTargetConnector(backend: Backend) {
	let handlerId: Identifier
	// The drop target may either be attached via ref or connect function
	let dropTargetRef = React.createRef<any>()
	let dropTargetNode: any
	let dropTargetOptions: any
	let disconnectDropTarget: Unsubscribe | undefined

	function reconnectDropTarget() {
		if (disconnectDropTarget) {
			disconnectDropTarget()
			disconnectDropTarget = undefined
		}

		const dropTarget = dropTargetNode || dropTargetRef.current
		if (handlerId && dropTarget) {
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
			dropTargetRef,
			dropTarget: function connectDropTarget(node: any, options: any) {
				dropTargetOptions = options
				if (isRef(node)) {
					dropTargetRef = node
				} else {
					dropTargetNode = node
				}
			},
		}),
		reconnect: reconnectDropTarget,
	}
}
