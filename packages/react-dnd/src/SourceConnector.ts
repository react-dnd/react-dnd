declare var require: any
import * as React from 'react'
import wrapConnectorHooks from './wrapConnectorHooks'
import { Backend, Unsubscribe, Identifier } from 'dnd-core'
import { isRef } from './utils/isRef'
import { DragSourceOptions, DragPreviewOptions } from './interfaces'
const shallowEqual = require('shallowequal')

export interface Connector {
	hooks: any
	connectTarget: any
	receiveHandlerId(handlerId: Identifier | null): void
	reconnect(): void
}

export default class SourceConnector implements Connector {
	public hooks = wrapConnectorHooks({
		dragSource: (
			node: Element | React.ReactElement | React.Ref<any>,
			options?: DragSourceOptions,
		) => {
			this.dragSourceOptions = options || null
			if (isRef(node)) {
				this.dragSourceRef = node as React.RefObject<any>
			} else {
				this.dragSourceRef = { current: node }
			}
			this.reconnectDragSource()
		},
		dragPreview: (node: any, options?: DragPreviewOptions) => {
			this.dragPreviewOptions = options || null
			if (isRef(node)) {
				this.dragPreviewRef = node
			} else {
				this.dragPreviewRef = { current: node }
			}
			this.reconnectDragPreview()
		},
	})
	private handlerId: Identifier | null = null

	// The drop target may either be attached via ref or connect function
	private dragSourceRef: React.RefObject<any> = { current: null }
	private dragSourceOptionsInternal: DragSourceOptions | null = null
	private dragSourceUnsubscribe: Unsubscribe | undefined

	// The drag preview may either be attached via ref or connect function
	private dragPreviewRef: React.RefObject<any> = { current: null }
	private dragPreviewOptionsInternal: DragPreviewOptions | null = null
	private dragPreviewUnsubscribe: Unsubscribe | undefined

	private lastConnectedHandlerId: Identifier | null = null
	private lastConnectedDragSource: any = null
	private lastConnectedDragSourceOptions: any = null
	private lastConnectedDragPreview: any = null
	private lastConnectedDragPreviewOptions: any = null

	constructor(private backend: Backend) {}

	public receiveHandlerId(newHandlerId: Identifier | null) {
		if (this.handlerId === newHandlerId) {
			return
		}

		this.handlerId = newHandlerId
		this.reconnect()
	}

	get connectTarget() {
		return this.dragSource
	}

	public get dragSourceOptions() {
		return this.dragSourceOptionsInternal
	}
	public set dragSourceOptions(options: DragSourceOptions | null) {
		this.dragSourceOptionsInternal = options
	}

	public get dragPreviewOptions() {
		return this.dragPreviewOptionsInternal
	}

	public set dragPreviewOptions(options: DragPreviewOptions | null) {
		this.dragPreviewOptionsInternal = options
	}

	public reconnect() {
		this.reconnectDragSource()
		this.reconnectDragPreview()
	}

	private reconnectDragSource() {
		// if nothing has changed then don't resubscribe
		const didChange =
			this.didHandlerIdChange() ||
			this.didConnectedDragSourceChange() ||
			this.didDragSourceOptionsChange()

		if (didChange) {
			this.disconnectDragSource()
		}

		const dragSource = this.dragSource
		// gross, but corrects liveness issues until we remove the ability to connect on JSX trees
		// (https://github.com/react-dnd/react-dnd/pull/1355#issuecomment-498559740)
		this.lastConnectedDragSource = dragSource

		if (!this.handlerId || !dragSource) {
			return
		}

		if (didChange) {
			this.lastConnectedHandlerId = this.handlerId
			this.lastConnectedDragSourceOptions = this.dragSourceOptions
			this.dragSourceUnsubscribe = this.backend.connectDragSource(
				this.handlerId,
				dragSource,
				this.dragSourceOptions,
			)
		}
	}

	private reconnectDragPreview() {
		// if nothing has changed then don't resubscribe
		const didChange =
			this.didHandlerIdChange() ||
			this.didConnectedDragPreviewChange() ||
			this.didDragPreviewOptionsChange()

		if (didChange) {
			this.disconnectDragPreview()
		}

		const dragPreview = this.dragPreview
		if (!this.handlerId || !dragPreview) {
			return
		}

		if (didChange) {
			this.lastConnectedHandlerId = this.handlerId
			this.lastConnectedDragPreviewOptions = this.dragPreviewOptions
			this.lastConnectedDragPreview = dragPreview
			this.dragPreviewUnsubscribe = this.backend.connectDragPreview(
				this.handlerId,
				dragPreview,
				this.dragPreviewOptions,
			)
		}
	}

	private didHandlerIdChange(): boolean {
		return this.lastConnectedHandlerId !== this.handlerId
	}

	private didConnectedDragSourceChange(): boolean {
		return this.lastConnectedDragSource !== this.dragSource
	}

	private didConnectedDragPreviewChange(): boolean {
		return this.lastConnectedDragPreview !== this.dragPreview
	}

	private didDragSourceOptionsChange(): boolean {
		return !shallowEqual(
			this.lastConnectedDragSourceOptions,
			this.dragSourceOptions,
		)
	}

	private didDragPreviewOptionsChange(): boolean {
		return !shallowEqual(
			this.lastConnectedDragPreviewOptions,
			this.dragPreviewOptions,
		)
	}

	private disconnectDragSource() {
		if (this.dragSourceUnsubscribe) {
			this.dragSourceUnsubscribe()
			this.dragSourceUnsubscribe = undefined
			this.dragSourceRef = { current: null }
		}
	}

	private disconnectDragPreview() {
		if (this.dragPreviewUnsubscribe) {
			this.dragPreviewUnsubscribe()
			this.dragPreviewUnsubscribe = undefined
			this.dragPreviewRef = { current: null }
		}
	}

	private get dragSource() {
		return this.dragSourceRef && this.dragSourceRef.current
	}

	private get dragPreview() {
		return this.dragPreviewRef && this.dragPreviewRef.current
	}
}
