/**
 * A tick that users can use to work through the event queue
 */
export function tick() {
	return new Promise((resolve) => {
		setTimeout(resolve, 0)
	})
}
