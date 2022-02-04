/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Identifier } from 'dnd-core'
import type { ITestBackend } from 'react-dnd-test-backend'
import { act } from 'react-dom/test-utils'

/**
 * Simulates a drag/drop sequence using the Test Backend
 * @param source The source to drag
 * @param target The target to drop to
 * @param backend The test backend instance
 */
export function simulateDragDrop(
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

/**
 * Simulates a hover sequence using the Test Backend
 * @param source The source draggable
 * @param target The target element
 * @param backend The test backend
 */
export function simulateDragHover(
	source: HandlerIdProvider,
	target: HandlerIdProvider,
	backend: ITestBackend,
): void {
	const sourceHandlerId = getHandlerId(source)
	const targetHandlerId = getHandlerId(target)
	act(() => {
		backend.simulateBeginDrag([sourceHandlerId])
		backend.simulateHover([targetHandlerId])
	})
}

/**
 * Simulates a hover sequence using the Test Backend
 * @param source The source draggable
 * @param target The target element
 * @param backend The test backend
 */
export function simulateDrag(
	source: HandlerIdProvider,
	backend: ITestBackend,
): void {
	const sourceHandlerId = getHandlerId(source)
	act(() => {
		backend.simulateBeginDrag([sourceHandlerId])
	})
}

export function getHandlerId(provider: HandlerIdProvider): Identifier {
	if (typeof provider === 'string' || typeof provider === 'symbol') {
		return provider
	} else if (typeof provider === 'function') {
		return provider() as Identifier
	} else {
		throw new Error('Could not get handlerId from DnD source')
	}
}
export type HandlerIdProvider = () => Identifier | null
