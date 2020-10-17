import { memoize, union } from '../js_utils'

describe('lodash replacement', () => {
	it('can memoize', () => {
		let count = 0
		const fn = memoize(() => {
			if (count > 0) {
				throw new Error('too many invocations to memoized function')
			}
			count += 1
			return 100 + 30
		})

		expect(fn()).toEqual(130)
		expect(fn()).toEqual(130)
		expect(fn()).toEqual(130)
	})

	it('can compute union', () => {
		const result = union([1, 2, 1, 3, 1, 5], [7, 8, 7, 9])
		expect(result).toEqual([1, 2, 3, 5, 7, 8, 9])
	})
})
