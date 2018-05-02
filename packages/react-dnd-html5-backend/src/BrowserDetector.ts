const memoize = require('lodash/memoize')

declare global {
	// tslint:disable-next-line interface-name
	interface Window {
		safari: any
	}
}

export const isFirefox = memoize(() => /firefox/i.test(navigator.userAgent))
export const isSafari = memoize(() => Boolean(window.safari))
