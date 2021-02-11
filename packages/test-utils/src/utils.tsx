/* eslint-disable @typescript-eslint/no-unused-vars */
import { Identifier } from 'dnd-core'
import { ITestBackend } from 'react-dnd-test-backend'
import { DndComponent } from 'react-dnd'
import { act } from 'react-dom/test-utils'

export function simulateDragDropSequence(
	source: HandlerIdProvider,
	target: HandlerIdProvider,
	backend: ITestBackend,
): void {
	const sourceHandlerId = getHandlerId(source)
	const targetHandlerId = getHandlerId(target)
	act(() => {
		backend.simulateBeginDrag([sourceHandlerId])
		backend.simulateHover([targetHandlerId])
		backend.simulateDrop()
		backend.simulateEndDrag()
	})
}

export function simulateHoverSequence(
	source: HandlerIdProvider,
	target: HandlerIdProvider,
	backend: ITestBackend,
): void {
	const sourceHandlerId = getHandlerId(source)
	const targetHandlerId = getHandlerId(target)
	act(() => {
		backend.simulateBeginDrag([sourceHandlerId])
		backend.simulateHover([targetHandlerId])
		backend.simulateEndDrag()
	})
}

export function getHandlerId(provider: HandlerIdProvider): Identifier {
	if (typeof provider === 'string' || typeof provider === 'symbol') {
		return provider
	} else if (typeof provider === 'function') {
		return provider() as Identifier
	} else if (typeof provider?.getHandlerId === 'function') {
		return provider.getHandlerId()
	} else {
		throw new Error('Could not get handlerId from DnD source')
	}
}
export type HandlerIdProvider =
	| Identifier
	| DndComponent<any>
	| (() => Identifier | null)

/**
 * A tick that users can use to work through the event queue
 */
export function tick() {
	return new Promise((resolve) => {
		setTimeout(resolve, 0)
	})
}
