import type { TouchBackendOptions } from '../interfaces.js'
import { OptionsReader } from '../OptionsReader.js'

describe('The Touch Backend Options Reader', () => {
	it('can be constructed and emits some defaults', () => {
		const options = new (OptionsReader as any)({}) as TouchBackendOptions
		expect(options.delayTouchStart).toEqual(0)
		expect(options.delayMouseStart).toEqual(0)
		expect(options.enableMouseEvents).toEqual(false)
		expect(options.enableTouchEvents).toEqual(true)
	})
})
