import wrapConnectorHooks from './wrapConnectorHooks'
import { IBackend, Unsubscribe } from 'dnd-core'

const shallowEqual = require('shallowequal')

export default function createSourceConnector(backend: IBackend) {
	let currentHandlerId: string

	let currentDragSourceNode: any
	let currentDragSourceOptions: any
	let disconnectCurrentDragSource: Unsubscribe | undefined

	let currentDragPreviewNode: any
	let currentDragPreviewOptions: any
	let disconnectCurrentDragPreview: Unsubscribe | undefined

	function reconnectDragSource() {
		if (disconnectCurrentDragSource) {
			disconnectCurrentDragSource()
			disconnectCurrentDragSource = undefined
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
			disconnectCurrentDragPreview = undefined
		}

		if (currentHandlerId && currentDragPreviewNode) {
			disconnectCurrentDragPreview = backend.connectDragPreview(
				currentHandlerId,
				currentDragPreviewNode,
				currentDragPreviewOptions,
			)
		}
	}

	function receiveHandlerId(handlerId: string) {
		if (handlerId === currentHandlerId) {
			return
		}

		currentHandlerId = handlerId
		reconnectDragSource()
		reconnectDragPreview()
	}

	const hooks = wrapConnectorHooks({
		dragSource: function connectDragSource(node: any, options: any) {
			if (
				node === currentDragSourceNode &&
				shallowEqual(options, currentDragSourceOptions)
			) {
				return
			}

			currentDragSourceNode = node
			currentDragSourceOptions = options

			reconnectDragSource()
		},

		dragPreview: function connectDragPreview(node: any, options: any) {
			if (
				node === currentDragPreviewNode &&
				shallowEqual(options, currentDragPreviewOptions)
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
