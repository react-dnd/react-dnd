declare var require: any
import * as React from 'react'
import wrapConnectorHooks from './wrapConnectorHooks'
import { Backend, Unsubscribe, Identifier } from 'dnd-core'
import { isRef } from './hooks/util'
import { DragSourceOptions, DragPreviewOptions } from './interfaces'
const shallowEqual = require('shallowequal')

export default function createSourceConnector(backend: Backend) {
	let handlerId: Identifier

	// The drop target may either be attached via ref or connect function
	let dragSourceRef: React.RefObject<any> | null = null
	let dragSourceNode: any
	let dragSourceOptions: any
	let disconnectDragSource: Unsubscribe | undefined

	// The drag preview may either be attached via ref or connect function
	let dragPreviewRef: React.RefObject<any> | null = null
	let dragPreviewNode: any
	let dragPreviewOptions: any
	let disconnectDragPreview: Unsubscribe | undefined

	let lastConnectedHandlerId: Identifier | null = null
	let lastConnectedDragSource: any = null
	let lastConnectedDragSourceOptions: any = null
	let lastConnectedDragPreview: any = null
	let lastConnectedDragPreviewOptions: any = null

	function reconnectDragSource() {
		const dragSource =
			dragSourceNode || (dragSourceRef && dragSourceRef.current)
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
		const dragPreview =
			dragPreviewNode || (dragPreviewRef && dragPreviewRef.current)
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
			dragSourceRef: (options?: DragSourceOptions) => {
				dragSourceOptions = options
				dragSourceRef = React.createRef()
				return dragSourceRef
			},
			dragSource: (
				node: Element | React.ReactElement | React.Ref<any>,
				options?: DragSourceOptions,
			) => {
				dragSourceOptions = options
				if (isRef(node)) {
					dragSourceRef = node as React.RefObject<any>
				} else {
					dragSourceNode = node
				}
			},
			dragPreviewRef: (options?: DragPreviewOptions) => {
				dragPreviewOptions = options
				dragPreviewRef = React.createRef()
				return dragPreviewRef
			},
			dragPreview: (node: any, options?: DragPreviewOptions) => {
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
