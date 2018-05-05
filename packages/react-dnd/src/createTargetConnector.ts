import wrapConnectorHooks from './wrapConnectorHooks'
import { IBackend, Unsubscribe } from 'dnd-core'
const shallowEqual = require('shallowequal')

export default function createTargetConnector(backend: IBackend) {
	let currentHandlerId: string

	let currentDropTargetNode: any
	let currentDropTargetOptions: any
	let disconnectCurrentDropTarget: Unsubscribe | undefined

	function reconnectDropTarget() {
		if (disconnectCurrentDropTarget) {
			disconnectCurrentDropTarget()
			disconnectCurrentDropTarget = undefined
		}

		if (currentHandlerId && currentDropTargetNode) {
			disconnectCurrentDropTarget = backend.connectDropTarget(
				currentHandlerId,
				currentDropTargetNode,
				currentDropTargetOptions,
			)
		}
	}

	function receiveHandlerId(handlerId: string) {
		if (handlerId === currentHandlerId) {
			return
		}

		currentHandlerId = handlerId
		reconnectDropTarget()
	}

	const hooks = wrapConnectorHooks({
		dropTarget: function connectDropTarget(node: any, options: any) {
			if (
				node === currentDropTargetNode &&
				shallowEqual(options, currentDropTargetOptions)
			) {
				return
			}

			currentDropTargetNode = node
			currentDropTargetOptions = options

			reconnectDropTarget()
		},
	})

	return {
		receiveHandlerId,
		hooks,
	}
}
