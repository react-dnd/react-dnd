declare var require: any
import * as React from 'react'
import wrapConnectorHooks from './wrapConnectorHooks'
import { Backend, Unsubscribe, Identifier } from 'dnd-core'
import { isRef } from './hooks/util'
const shallowEqual = require('shallowequal')

export default function createSourceConnector(backend: Backend) {
	let handlerId: Identifier

	// The drop target may either be attached via ref or connect function
	let dragSourceRef = React.createRef<any>()
	let dragSourceNode: any
	let dragSourceOptions: any
	let disconnectDragSource: Unsubscribe | undefined

	// The drag preview may either be attached via ref or connect function
	let dragPreviewRef = React.createRef<any>()
	let dragPreviewNode: any
	let dragPreviewOptions: any
	let disconnectDragPreview: Unsubscribe | undefined

	let lastConnectedHandlerId: Identifier | null = null
	let lastConnectedDragSource: any = null
	let lastConnectedDragSourceOptions: any = null
	let lastConnectedDragPreview: any = null
	let lastConnectedDragPreviewOptions: any = null

	function reconnectDragSource() {
		const dragSource = dragSourceNode || dragSourceRef.current
		if (!handlerId || !dragSource) {
			return
		}

		// if nothing has changed then don't resubscribe
		if (
			lastConnectedHandlerId !== handlerId ||
			lastConnectedDragSource !== dragSource ||
			!shallowEqual(lastConnectedDragSourceOptions, dragSourceOptions)
		) {
			if (disconnectDragSource) {
				disconnectDragSource()
				disconnectDragSource = undefined
			}

			lastConnectedHandlerId = handlerId
			lastConnectedDragSource = dragSource
			lastConnectedDragSourceOptions = dragSourceOptions
			disconnectDragSource = backend.connectDragSource(
				handlerId,
				dragSource,
				dragSourceOptions,
			)
		}
	}

	function reconnectDragPreview() {
		const dragPreview = dragPreviewNode || dragPreviewRef.current
		if (!handlerId || !dragPreview) {
			return
		}

		// if nothing has changed then don't resubscribe
		if (
			lastConnectedHandlerId !== handlerId ||
			lastConnectedDragPreview !== dragPreview ||
			!shallowEqual(lastConnectedDragPreviewOptions, dragPreviewOptions)
		) {
			if (disconnectDragPreview) {
				disconnectDragPreview()
				disconnectDragPreview = undefined
			}
			lastConnectedHandlerId = handlerId
			lastConnectedDragPreview = dragPreview
			lastConnectedDragPreviewOptions = dragPreviewOptions
			disconnectDragPreview = backend.connectDragPreview(
				handlerId,
				dragPreview,
				dragPreviewOptions,
			)
		}
	}

	function receiveHandlerId(newHandlerId: Identifier) {
		if (handlerId === newHandlerId) {
			return
		}

		handlerId = newHandlerId
		reconnectDragSource()
		reconnectDragPreview()
	}

	return {
		receiveHandlerId,
		hooks: wrapConnectorHooks({
			dragSourceRef,
			dragPreviewRef,
			dragSource: function connectDragSource(node: any, options?: any) {
				dragSourceOptions = options
				if (isRef(node)) {
					dragSourceRef = node
				} else {
					dragSourceNode = node
				}
			},

			dragPreview: function connectDragPreview(node: any, options?: any) {
				dragPreviewOptions = options
				if (isRef(node)) {
					dragPreviewRef = node
				} else {
					dragPreviewNode = node
				}
			},
		}),
		reconnect: () => {
			reconnectDragSource()
			reconnectDragPreview()
		},
	}
}
