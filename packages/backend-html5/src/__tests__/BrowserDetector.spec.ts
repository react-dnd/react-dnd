import { isFirefox } from '../BrowserDetector.js'

describe('BrowserDetector', () => {
	it('should detect firefox', () => {
		expect(isFirefox()).toEqual(false)
	})
})
