import { xor, intersection } from '../discount_lodash'

describe('the utilities module', () => {
	it('can compute xor', () => {
		const result = xor([1, 5, 7], [1, 3, 9, 7])
		expect(result).toEqual([5, 3, 9])
	})

	it('can compute intersection', () => {
		const result = intersection([1, 5, 7], [1, 3, 9, 7])
		expect(result).toEqual([1, 7])
	})
})
