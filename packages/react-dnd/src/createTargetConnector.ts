declare var require: any
import * as React from 'react'
import wrapConnectorHooks from './wrapConnectorHooks'
import { Backend, Unsubscribe, Identifier } from 'dnd-core'
const shallowEqual = require('shallowequal')

export default function createTargetConnector(backend: Backend) {
	let handlerId: Identifier
	// The drop target may either be attached via ref or connect function
	const dropTargetRef = React.createRef<any>()
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

	const hooks = wrapConnectorHooks({
		dropTargetRef,
		dropTarget: function connectDropTarget(node: any, options: any) {
			if (node === dropTargetNode && shallowEqual(options, dropTargetOptions)) {
				return
			}

			dropTargetNode = node
			dropTargetOptions = options
		},
	})

	return {
		receiveHandlerId,
		hooks,
		reconnect: reconnectDropTarget,
	}
}
