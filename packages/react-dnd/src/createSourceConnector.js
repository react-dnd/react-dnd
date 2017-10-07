import wrapConnectorHooks from './wrapConnectorHooks'
import areOptionsEqual from './areOptionsEqual'

export default function createSourceConnector(backend) {
	let currentHandlerId

	let currentDragSourceNode
	let currentDragSourceOptions
	let disconnectCurrentDragSource

	let currentDragPreviewNode
	let currentDragPreviewOptions
	let disconnectCurrentDragPreview

	function reconnectDragSource() {
		if (disconnectCurrentDragSource) {
			disconnectCurrentDragSource()
			disconnectCurrentDragSource = null
		}

		if (currentHandlerId && currentDragSourceNode) {
			disconnectCurrentDragSource = backend.connectDragSource(
				currentHandlerId,
				currentDragSourceNode,
				currentDragSourceOptions,
			)
		}
	}

	function reconnectDragPreview() {
		if (disconnectCurrentDragPreview) {
			disconnectCurrentDragPreview()
			disconnectCurrentDragPreview = null
		}

		if (currentHandlerId && currentDragPreviewNode) {
			disconnectCurrentDragPreview = backend.connectDragPreview(
				currentHandlerId,
				currentDragPreviewNode,
				currentDragPreviewOptions,
			)
		}
	}

	function receiveHandlerId(handlerId) {
		if (handlerId === currentHandlerId) {
			return
		}

		currentHandlerId = handlerId
		reconnectDragSource()
		reconnectDragPreview()
	}

	const hooks = wrapConnectorHooks({
		dragSource: function connectDragSource(node, options) {
			if (
				node === currentDragSourceNode &&
				areOptionsEqual(options, currentDragSourceOptions)
			) {
				return
			}

			currentDragSourceNode = node
			currentDragSourceOptions = options

			reconnectDragSource()
		},

		dragPreview: function connectDragPreview(node, options) {
			if (
				node === currentDragPreviewNode &&
				areOptionsEqual(options, currentDragPreviewOptions)
			) {
				return
			}

			currentDragPreviewNode = node
			currentDragPreviewOptions = options

			reconnectDragPreview()
		},
	})

	return {
		receiveHandlerId,
		hooks,
	}
}
