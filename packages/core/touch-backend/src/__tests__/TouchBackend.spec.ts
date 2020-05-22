import { TouchBackend } from '../TouchBackend'
import { DragDropManager } from 'dnd-core'

describe('TouchBackend', () => {
	it('can be constructed', () => {
		const backend = new TouchBackend(mockManager(), {}, {})
		expect(backend).toBeDefined()
	})

	it('can be constructed', () => {
		const backend = new TouchBackend(mockManager(), {}, {})
		expect(backend).toBeDefined()
		const profile = backend.profile()
		expect(profile).toBeDefined()
		Object.keys(profile).forEach((profilingKey) =>
			expect(profile[profilingKey]).toEqual(0),
		)
	})
})

function mockManager(): DragDropManager {
	return {
		getActions: () => null,
		getMonitor: () => null,
		getRegistry: () => null,
	} as any
}
