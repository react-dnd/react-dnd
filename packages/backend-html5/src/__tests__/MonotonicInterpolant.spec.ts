import { MonotonicInterpolant } from '../MonotonicInterpolant.js'

describe('The MonotonicInterpolant', () => {
	it('can be constructed', () => {
		const mi = new MonotonicInterpolant([0, 100], [100, 200])
		expect(mi).toBeDefined()

		expect(mi.interpolate(50)).toEqual(150)
	})
})
