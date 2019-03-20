import getEmptyImage from '../getEmptyImage'

describe('Get Empty Image', () => {
	it('should return image', () => {
		const image = getEmptyImage()
		expect(image.getAttribute('src')).toBeDefined()
	})
})
