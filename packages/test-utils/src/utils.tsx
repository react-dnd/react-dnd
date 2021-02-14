/**
 * A tick that users can use to work through the event queue
 */
export function tick(): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, 0)
	})
}
