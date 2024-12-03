import { OptionsReader } from '../OptionsReader.js'

declare const global: any

describe('The HTML5Backend Options Reader', () => {
	describe('window injection', () => {
		it('uses an undefined window when no window is available', () => {
			const mockWindow = global.window
			try {
				// rome-ignore lint/performance/noDelete: This doesn't work without delete
				delete global.window
				expect(global.window).toBeUndefined()
				const options = new OptionsReader(undefined)
				expect(options.window).toBeUndefined()
			} finally {
				global.window = mockWindow
			}
		})
	})
})
