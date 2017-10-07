import wrapConnectorHooks from './wrapConnectorHooks'
import areOptionsEqual from './areOptionsEqual'

export default function createTargetConnector(backend) {
	let currentHandlerId

	let currentDropTargetNode
	let currentDropTargetOptions
	let disconnectCurrentDropTarget

	function reconnectDropTarget() {
		if (disconnectCurrentDropTarget) {
			disconnectCurrentDropTarget()
			disconnectCurrentDropTarget = null
		}

		if (currentHandlerId && currentDropTargetNode) {
			disconnectCurrentDropTarget = backend.connectDropTarget(
				currentHandlerId,
				currentDropTargetNode,
				currentDropTargetOptions,
			)
		}
	}

	function receiveHandlerId(handlerId) {
		if (handlerId === currentHandlerId) {
			return
		}

		currentHandlerId = handlerId
		reconnectDropTarget()
	}

	const hooks = wrapConnectorHooks({
		dropTarget: function connectDropTarget(node, options) {
			if (
				node === currentDropTargetNode &&
				areOptionsEqual(options, currentDropTargetOptions)
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
