const supportsPassive = (() => {
	// simular to jQuery's test
	let supported = false
	try {
		addEventListener(
			'test',
			() => {},
			Object.defineProperty({}, 'passive', {
				get() {
					supported = true
					return true
				},
			}),
		)
	} catch (e) {
		// do nothing
	}
	return supported
})()
export default supportsPassive
