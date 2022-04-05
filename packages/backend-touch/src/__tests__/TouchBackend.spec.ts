import type { DragDropManager } from 'dnd-core'

import { TouchBackend } from '../index.js'
import type { TouchBackendImpl } from '../TouchBackendImpl.js'

describe('TouchBackend', () => {
	it('can be constructed', () => {
		const backend = TouchBackend(mockManager(), {}, {})
		expect(backend).toBeDefined()
	})

	it('can be constructed', () => {
		const backend = TouchBackend(mockManager(), {}, {})
		expect(backend).toBeDefined()
		const profile = backend.profile()
		expect(profile).toBeDefined()
		Object.keys(profile).forEach((profilingKey) =>
			expect(profile[profilingKey]).toEqual(0),
		)
	})

	it('can determine target ids', () => {
		const mockNode1 = {} as HTMLElement
		const mockNode2 = {} as HTMLElement
		const backend = TouchBackend(mockManager(), {}, {}) as TouchBackendImpl
		backend.targetNodes.set('abc', mockNode1)
		backend.targetNodes.set('def', mockNode2)

		expect(backend._getDropTargetId(mockNode1)).toEqual('abc')
		expect(backend._getDropTargetId(mockNode2)).toEqual('def')
		expect(backend._getDropTargetId({} as Element)).toEqual(undefined)
	})
})

function mockManager(): DragDropManager {
	return {
		getActions: () => null,
		getMonitor: () => null,
		getRegistry: () => null,
	} as any
}
