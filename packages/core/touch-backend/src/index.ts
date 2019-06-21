/**
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import invariant from 'invariant'
import {
	BackendFactory,
	DragDropActions,
	DragDropMonitor,
	Backend,
	DragDropManager,
	Identifier,
	XYCoord,
} from 'dnd-core'
declare global {
	interface Document {
		msElementsFromPoint: Document['elementsFromPoint']
	}
}

function isTouchEvent(e: Touch | TouchEvent | MouseEvent): e is TouchEvent {
	return !!(e as TouchEvent).targetTouches
}

function getEventClientTouchOffset(e: TouchEvent): XYCoord | undefined {
	if (e.targetTouches.length === 1) {
		return getEventClientOffset(e.targetTouches[0])
	}
}

function getEventClientOffset(
	e: TouchEvent | Touch | MouseEvent,
): XYCoord | undefined {
	if (isTouchEvent(e)) {
		return getEventClientTouchOffset(e)
	} else {
		return {
			x: e.clientX,
			y: e.clientY,
		}
	}
}

// Used for MouseEvent.buttons (note the s on the end).
const MouseButtons = {
	Left: 1,
	Right: 2,
	Center: 4,
}

// Used for e.button (note the lack of an s on the end).
const MouseButton = {
	Left: 0,
	Center: 1,
	Right: 2,
}

/**
 * Only touch events and mouse events where the left button is pressed should initiate a drag.
 * @param {MouseEvent | TouchEvent} e The event
 */
function eventShouldStartDrag(e: any) {
	// For touch events, button will be undefined. If e.button is defined,
	// then it should be MouseButton.Left.
	return e.button === undefined || e.button === MouseButton.Left
}

/**
 * Only touch events and mouse events where the left mouse button is no longer held should end a drag.
 * It's possible the user mouse downs with the left mouse button, then mouse down and ups with the right mouse button.
 * We don't want releasing the right mouse button to end the drag.
 * @param {MouseEvent | TouchEvent} e The event
 */
function eventShouldEndDrag(e: any) {
	// Touch events will have buttons be undefined, while mouse events will have e.buttons's left button
	// bit field unset if the left mouse button has been released
	return e.buttons === undefined || (e.buttons & MouseButtons.Left) === 0
}

// Polyfill for document.elementsFromPoint
const elementsFromPoint = (
	(typeof document !== 'undefined' && document.elementsFromPoint) ||
	function(x, y) {
		if (document.msElementsFromPoint) {
			// msElementsFromPoint is much faster but returns a node-list, so convert it to an array
			const msElements = document.msElementsFromPoint(x, y)
			return msElements && Array.prototype.slice.call(msElements, 0)
		}

		let elements = []
		let previousPointerEvents = []
		let current: any
		let i
		let d

		// get all elements via elementFromPoint, and remove them from hit-testing in order
		while (
			(current = document.elementFromPoint(x, y)) &&
			elements.indexOf(current) === -1 &&
			current !== null
		) {
			// push the element and its current style
			elements.push(current)
			previousPointerEvents.push({
				value: current.style.getPropertyValue('pointer-events'),
				priority: current.style.getPropertyPriority('pointer-events'),
			})

			// add "pointer-events: none", to get to the underlying element
			current.style.setProperty('pointer-events', 'none', 'important')
		}

		// restore the previous pointer-events values
		for (i = previousPointerEvents.length; (d = previousPointerEvents[--i]); ) {
			elements[i].style.setProperty(
				'pointer-events',
				d.value ? d.value : '',
				d.priority,
			)
		}

		// return our results
		return elements
	}
).bind(typeof document !== 'undefined' ? document : null)

const supportsPassive = (() => {
	// simular to jQuery's test
	let supported = false
	try {
		addEventListener(
			'test',
			() => {},
			Object.defineProperty({}, 'passive', {
				get() {
					supported = true
					return true
				},
			}),
		)
	} catch (e) {
		// do nothing
	}
	return supported
})()

const ELEMENT_NODE = 1
function getNodeClientOffset(node: any) {
	const el = node.nodeType === ELEMENT_NODE ? node : node.parentElement

	if (!el) {
		return null
	}

	const { top, left } = el.getBoundingClientRect()
	return { x: left, y: top }
}

interface EventName {
	start?: 'mousedown' | 'touchstart'
	move?: 'mousemove' | 'touchmove'
	end?: 'mouseup' | 'touchend'
	contextmenu?: 'contextmenu'
	keydown?: 'keydown'
}

const eventNames: Record<LISTENER_TYPE, EventName> = {
	[LISTENER_TYPE.mouse]: {
		start: 'mousedown',
		move: 'mousemove',
		end: 'mouseup',
		contextmenu: 'contextmenu',
	},
	[LISTENER_TYPE.touch]: {
		start: 'touchstart',
		move: 'touchmove',
		end: 'touchend',
	},
	[LISTENER_TYPE.keyboard]: {
		keydown: 'keydown',
	},
}

export interface Opts {
	delay?: number
	delayTouchStart?: number
	enableTouchEvents?: boolean
	enableKeyboardEvents?: boolean
	enableMouseEvents?: boolean
	ignoreContextMenu?: boolean
	enableHoverOutsideTarget?: boolean
	delayMouseStart?: number
	touchSlop?: number
	scrollAngleRanges?: AngleRange[]
	getDropTargetElementsAtPoint?: Function
}

interface AngleRange {
	start: number
	end: number
}

const enum LISTENER_TYPE {
	mouse = 'mouse',
	touch = 'touch',
	keyboard = 'keyboard',
}

export class TouchBackend implements Backend {
	private enableKeyboardEvents: boolean | undefined
	private enableMouseEvents: boolean | undefined
	private delayTouchStart: number | undefined
	private delayMouseStart: number | undefined
	private ignoreContextMenu: boolean | undefined
	private touchSlop: number | undefined
	private scrollAngleRanges: AngleRange[] | undefined
	private enableHoverOutsideTarget: boolean | undefined
	private sourceNodes: Record<Identifier, HTMLElement>
	private sourcePreviewNodes: Record<string, HTMLElement>
	private sourcePreviewNodeOptions: Record<string, {}>
	private targetNodes: Record<string, HTMLElement>
	private _mouseClientOffset: Partial<XYCoord>
	private _isScrolling: boolean
	private listenerTypes: LISTENER_TYPE[]
	private actions: DragDropActions
	private monitor: DragDropMonitor
	private getDropTargetElementsAtPoint: Function | undefined
	private static isSetUp: boolean
	private moveStartSourceIds: string[] | undefined
	private waitingForDelay: boolean | undefined
	private timeout: ReturnType<typeof setTimeout> | undefined
	private dragOverTargetIds: string[] | undefined
	private draggedSourceNode: HTMLElement | undefined
	private draggedSourceNodeRemovalObserver: MutationObserver | undefined
	constructor(manager: Parameters<BackendFactory>[0], options: Opts = {}) {
		options.delayTouchStart = options.delayTouchStart || options.delay

		options = {
			enableTouchEvents: true,
			enableMouseEvents: false,
			enableKeyboardEvents: false,
			ignoreContextMenu: false,
			enableHoverOutsideTarget: false,
			delayTouchStart: 0,
			delayMouseStart: 0,
			touchSlop: 0,
			scrollAngleRanges: undefined,
			...options,
		}

		this.actions = manager.getActions()
		this.monitor = manager.getMonitor()

		this.enableKeyboardEvents = options.enableKeyboardEvents
		this.enableMouseEvents = options.enableMouseEvents
		this.delayTouchStart = options.delayTouchStart
		this.delayMouseStart = options.delayMouseStart
		this.ignoreContextMenu = options.ignoreContextMenu
		this.touchSlop = options.touchSlop
		this.scrollAngleRanges = options.scrollAngleRanges
		this.enableHoverOutsideTarget = options.enableHoverOutsideTarget

		this.sourceNodes = {}
		this.sourcePreviewNodes = {}
		this.sourcePreviewNodeOptions = {}
		this.targetNodes = {}
		this.listenerTypes = []
		this._mouseClientOffset = {}
		this._isScrolling = false

		if (options.enableMouseEvents) {
			this.listenerTypes.push(LISTENER_TYPE.mouse)
		}

		if (options.enableTouchEvents) {
			this.listenerTypes.push(LISTENER_TYPE.touch)
		}

		if (options.enableKeyboardEvents) {
			this.listenerTypes.push(LISTENER_TYPE.keyboard)
		}

		if (options.getDropTargetElementsAtPoint) {
			this.getDropTargetElementsAtPoint = options.getDropTargetElementsAtPoint
		}
	}

	setup() {
		if (typeof window === 'undefined') {
			return
		}

		invariant(
			!TouchBackend.isSetUp,
			'Cannot have two Touch backends at the same time.',
		)
		TouchBackend.isSetUp = true

		this.addEventListener(window, 'start', this.getTopMoveStartHandler() as any)
		this.addEventListener(
			window,
			'start',
			this.handleTopMoveStartCapture as any,
			true,
		)
		this.addEventListener(window, 'move', this.handleTopMove as any)
		this.addEventListener(window, 'move', this.handleTopMoveCapture, true)
		this.addEventListener(
			window,
			'end',
			this.handleTopMoveEndCapture as any,
			true,
		)

		if (this.enableMouseEvents && !this.ignoreContextMenu) {
			this.addEventListener(window, 'contextmenu', this
				.handleTopMoveEndCapture as any)
		}

		if (this.enableKeyboardEvents) {
			this.addEventListener(
				window,
				'keydown',
				this.handleCancelOnEscape as any,
				true,
			)
		}
	}

	teardown() {
		if (typeof window === 'undefined') {
			return
		}

		TouchBackend.isSetUp = false
		this._mouseClientOffset = {}

		this.removeEventListener(
			window,
			'start',
			this.handleTopMoveStartCapture as any,
			true,
		)
		this.removeEventListener(window, 'start', this.handleTopMoveStart as any)
		this.removeEventListener(window, 'move', this.handleTopMoveCapture, true)
		this.removeEventListener(window, 'move', this.handleTopMove as any)
		this.removeEventListener(
			window,
			'end',
			this.handleTopMoveEndCapture as any,
			true,
		)

		if (this.enableMouseEvents && !this.ignoreContextMenu) {
			this.removeEventListener(window, 'contextmenu', this
				.handleTopMoveEndCapture as any)
		}

		if (this.enableKeyboardEvents) {
			this.removeEventListener(
				window,
				'keydown',
				this.handleCancelOnEscape as any,
				true,
			)
		}

		this.uninstallSourceNodeRemovalObserver()
	}

	addEventListener<K extends keyof EventName>(
		subject: HTMLElement | Window,
		event: K,
		handler: (e: any) => void,
		capture?: boolean,
	) {
		const options = supportsPassive ? { capture, passive: false } : capture

		this.listenerTypes.forEach(function(listenerType) {
			const evt = eventNames[listenerType][event]

			if (evt) {
				subject.addEventListener(evt as any, handler as any, options)
			}
		})
	}

	removeEventListener<K extends keyof EventName>(
		subject: HTMLElement | Window,
		event: K,
		handler: (e: any) => void,
		capture?: boolean,
	) {
		const options = supportsPassive ? { capture, passive: false } : capture

		this.listenerTypes.forEach(function(listenerType) {
			const evt = eventNames[listenerType][event]

			if (evt) {
				subject.removeEventListener(evt as any, handler as any, options)
			}
		})
	}

	connectDragSource(sourceId: any, node: HTMLElement) {
		const handleMoveStart = this.handleMoveStart.bind(this, sourceId)
		this.sourceNodes[sourceId] = node

		this.addEventListener(node, 'start', handleMoveStart)

		return () => {
			delete this.sourceNodes[sourceId]
			this.removeEventListener(node, 'start', handleMoveStart)
		}
	}

	connectDragPreview(sourceId: string, node: HTMLElement, options: any) {
		this.sourcePreviewNodeOptions[sourceId] = options
		this.sourcePreviewNodes[sourceId] = node

		return () => {
			delete this.sourcePreviewNodes[sourceId]
			delete this.sourcePreviewNodeOptions[sourceId]
		}
	}

	connectDropTarget(targetId: any, node: any) {
		const handleMove = (e: MouseEvent | TouchEvent) => {
			let coords

			if (!this.monitor.isDragging()) {
				return
			}

			/**
			 * Grab the coordinates for the current mouse/touch position
			 */
			switch (e.type) {
				case eventNames.mouse.move:
					coords = {
						x: (e as MouseEvent).clientX,
						y: (e as MouseEvent).clientY,
					}
					break

				case eventNames.touch.move:
					coords = {
						x: (e as TouchEvent).touches[0].clientX,
						y: (e as TouchEvent).touches[0].clientY,
					}
					break
			}

			/**
			 * Use the coordinates to grab the element the drag ended on.
			 * If the element is the same as the target node (or any of it's children) then we have hit a drop target and can handle the move.
			 */
			let droppedOn =
				coords != null
					? document.elementFromPoint(coords.x, coords.y)
					: undefined
			let childMatch = droppedOn && node.contains(droppedOn)

			if (droppedOn === node || childMatch) {
				return this.handleMove(e, targetId)
			}
		}

		/**
		 * Attaching the event listener to the body so that touchmove will work while dragging over multiple target elements.
		 */
		this.addEventListener(document.body, 'move', handleMove as any)
		this.targetNodes[targetId] = node

		return () => {
			delete this.targetNodes[targetId]
			this.removeEventListener(document.body, 'move', handleMove as any)
		}
	}

	getSourceClientOffset = (sourceId: string) => {
		return getNodeClientOffset(this.sourceNodes[sourceId])
	}

	handleTopMoveStartCapture = (e: Event) => {
		if (!eventShouldStartDrag(e)) {
			return
		}

		this.moveStartSourceIds = []
	}

	handleMoveStart = (sourceId: string) => {
		// Just because we received an event doesn't necessarily mean we need to collect drag sources.
		// We only collect start collecting drag sources on touch and left mouse events.
		if (Array.isArray(this.moveStartSourceIds)) {
			this.moveStartSourceIds.unshift(sourceId)
		}
	}

	getTopMoveStartHandler() {
		if (!this.delayTouchStart && !this.delayMouseStart) {
			return this.handleTopMoveStart
		}

		return this.handleTopMoveStartDelay
	}

	handleTopMoveStart = (e: MouseEvent | TouchEvent) => {
		if (!eventShouldStartDrag(e)) {
			return
		}

		// Don't prematurely preventDefault() here since it might:
		// 1. Mess up scrolling
		// 2. Mess up long tap (which brings up context menu)
		// 3. If there's an anchor link as a child, tap won't be triggered on link

		const clientOffset = getEventClientOffset(e)
		if (clientOffset) {
			this._mouseClientOffset = clientOffset
		}
		this.waitingForDelay = false
	}

	handleTopMoveStartDelay = (e: Event) => {
		if (!eventShouldStartDrag(e)) {
			return
		}

		const delay =
			e.type === eventNames.touch.start
				? this.delayTouchStart
				: this.delayMouseStart
		this.timeout = (setTimeout(
			this.handleTopMoveStart.bind(this, e as any),
			delay,
		) as any) as ReturnType<typeof setTimeout>
		this.waitingForDelay = true
	}

	handleTopMoveCapture = () => {
		this.dragOverTargetIds = []
	}

	handleMove = (_: any, targetId: string) => {
		if (this.dragOverTargetIds) {
			this.dragOverTargetIds.unshift(targetId)
		}
	}

	handleTopMove = (e: TouchEvent | MouseEvent) => {
		if (this.timeout) {
			clearTimeout(this.timeout)
		}
		if (this.waitingForDelay) {
			return
		}

		const {
			moveStartSourceIds,
			dragOverTargetIds,
			enableHoverOutsideTarget,
		} = this
		const clientOffset = getEventClientOffset(e)

		if (!clientOffset) {
			return
		}

		// If the touch move started as a scroll, or is is between the scroll angles
		if (
			this._isScrolling ||
			(!this.monitor.isDragging() &&
				inAngleRanges(
					this._mouseClientOffset.x || 0,
					this._mouseClientOffset.y || 0,
					clientOffset.x,
					clientOffset.y,
					this.scrollAngleRanges,
				))
		) {
			this._isScrolling = true
			return
		}

		// If we're not dragging and we've moved a little, that counts as a drag start
		if (
			!this.monitor.isDragging() &&
			this._mouseClientOffset.hasOwnProperty('x') &&
			moveStartSourceIds &&
			distance(
				this._mouseClientOffset.x || 0,
				this._mouseClientOffset.y || 0,
				clientOffset.x,
				clientOffset.y,
			) > (this.touchSlop ? this.touchSlop : 0)
		) {
			this.moveStartSourceIds = undefined

			this.actions.beginDrag(moveStartSourceIds, {
				clientOffset: this._mouseClientOffset,
				getSourceClientOffset: this.getSourceClientOffset,
				publishSource: false,
			})
		}

		if (!this.monitor.isDragging()) {
			return
		}

		const sourceNode = this.sourceNodes[this.monitor.getSourceId() as string]
		this.installSourceNodeRemovalObserver(sourceNode)
		this.actions.publishDragSource()

		e.preventDefault()

		// Get the node elements of the hovered DropTargets
		const dragOverTargetNodes = (dragOverTargetIds || []).map(
			key => this.targetNodes[key],
		)
		// Get the a ordered list of nodes that are touched by
		let elementsAtPoint = this.getDropTargetElementsAtPoint
			? this.getDropTargetElementsAtPoint(
					clientOffset.x,
					clientOffset.y,
					dragOverTargetNodes,
			  )
			: elementsFromPoint(clientOffset.x, clientOffset.y)
		// Extend list with parents that are not receiving elementsFromPoint events (size 0 elements and svg groups)
		let elementsAtPointExtended = []
		for (let nodeId in elementsAtPoint) {
			if (!elementsAtPoint.hasOwnProperty(nodeId)) {
				continue
			}
			let currentNode = elementsAtPoint[nodeId]
			elementsAtPointExtended.push(currentNode)
			while (currentNode) {
				currentNode = currentNode.parentElement
				if (elementsAtPointExtended.indexOf(currentNode) === -1) {
					elementsAtPointExtended.push(currentNode)
				}
			}
		}
		let orderedDragOverTargetIds: string[] = elementsAtPointExtended
			// Filter off nodes that arent a hovered DropTargets nodes
			.filter(node => dragOverTargetNodes.indexOf(node) > -1)
			// Map back the nodes elements to targetIds
			.map(node => {
				for (let targetId in this.targetNodes) {
					if (node === this.targetNodes[targetId]) {
						return targetId
					}
				}
				return undefined
			})
			// Filter off possible null rows
			.filter(node => !!node)
			.filter((id, index, ids) => ids.indexOf(id) === index) as string[]

		// Invoke hover for drop targets when source node is still over and pointer is outside
		if (enableHoverOutsideTarget) {
			for (let targetId in this.targetNodes) {
				if (
					this.targetNodes[targetId] &&
					this.targetNodes[targetId].contains(sourceNode) &&
					orderedDragOverTargetIds.indexOf(targetId) === -1
				) {
					orderedDragOverTargetIds.unshift(targetId)
					break
				}
			}
		}

		// Reverse order because dnd-core reverse it before calling the DropTarget drop methods
		orderedDragOverTargetIds.reverse()

		this.actions.hover(orderedDragOverTargetIds, {
			clientOffset: clientOffset,
		})
	}

	handleTopMoveEndCapture = (e: Event) => {
		this._isScrolling = false

		if (!eventShouldEndDrag(e)) {
			return
		}

		if (!this.monitor.isDragging() || this.monitor.didDrop()) {
			this.moveStartSourceIds = undefined
			return
		}

		e.preventDefault()

		this._mouseClientOffset = {}

		this.uninstallSourceNodeRemovalObserver()
		this.actions.drop()
		this.actions.endDrag()
	}

	handleCancelOnEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape' && this.monitor.isDragging()) {
			this._mouseClientOffset = {}

			this.uninstallSourceNodeRemovalObserver()
			this.actions.endDrag()
		}
	}

	installSourceNodeRemovalObserver(node: HTMLElement | undefined) {
		this.uninstallSourceNodeRemovalObserver()

		this.draggedSourceNode = node
		this.draggedSourceNodeRemovalObserver = new MutationObserver(() => {
			if (node && !node.parentElement) {
				this.resurrectSourceNode()
				this.uninstallSourceNodeRemovalObserver()
			}
		})

		if (!node || !node.parentElement) {
			return
		}

		this.draggedSourceNodeRemovalObserver.observe(node.parentElement, {
			childList: true,
		})
	}

	resurrectSourceNode() {
		if (this.draggedSourceNode) {
			this.draggedSourceNode.style.display = 'none'
			this.draggedSourceNode.removeAttribute('data-reactid')
			document.body.appendChild(this.draggedSourceNode)
		}
	}

	uninstallSourceNodeRemovalObserver() {
		if (this.draggedSourceNodeRemovalObserver) {
			this.draggedSourceNodeRemovalObserver.disconnect()
		}

		this.draggedSourceNodeRemovalObserver = undefined
		this.draggedSourceNode = undefined
	}
}

function isDragDropManager(
	optionsOrManager: DragDropManager<any> | Opts,
): optionsOrManager is DragDropManager<any> {
	return !!(optionsOrManager as DragDropManager<any>).getMonitor
}

export default function createTouchBackend(
	optionsOrManager: DragDropManager<any> | Opts,
) {
	const touchBackendFactory = function(manager: DragDropManager<any>) {
		return new TouchBackend(manager, optionsOrManager as Opts)
	}

	if (isDragDropManager(optionsOrManager)) {
		return touchBackendFactory(optionsOrManager)
	} else {
		return touchBackendFactory
	}
}

function distance(x1: number, y1: number, x2: number, y2: number) {
	return Math.sqrt(
		Math.pow(Math.abs(x2 - x1), 2) + Math.pow(Math.abs(y2 - y1), 2),
	)
}

function inAngleRanges(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	angleRanges?: AngleRange[],
) {
	if (!angleRanges) {
		return false
	}

	const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 180

	for (let i = 0; i < angleRanges.length; ++i) {
		if (
			(angleRanges[i].start == null || angle >= angleRanges[i].start) &&
			(angleRanges[i].end == null || angle <= angleRanges[i].end)
		) {
			return true
		}
	}

	return false
}
