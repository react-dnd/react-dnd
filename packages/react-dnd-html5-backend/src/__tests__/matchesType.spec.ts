import matchesType from '../matchesType'

describe('matchesType', () => {
	it('should match type for single source and single target', () => {
		const target = 'a'
		const source = 'a'
		expect(matchesType(target, source)).toBeTruthy()
	})

	it('should match type for single source and multiple targets', () => {
		const targets = ['a', 'b', 'c']
		const source = 'a'
		expect(matchesType(targets, source)).toBeTruthy()
	})

	it('should match type when source and target are null', () => {
		const target = null
		const source = null
		expect(matchesType(target, source)).toBeTruthy()
	})
})
