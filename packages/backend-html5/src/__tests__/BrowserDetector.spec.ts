import { isFirefox } from '../BrowserDetector'

describe('BrowserDetector', () => {
	it('should detect firefox', () => {
		expect(isFirefox()).toEqual(false)
	})
})
