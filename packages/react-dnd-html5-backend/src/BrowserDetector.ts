const memoize = require('lodash/memoize')

declare global {
	// tslint:disable-next-line interface-name
	interface Window {
		safari: any
	}
}

export type Predicate = () => boolean
export const isFirefox: Predicate = memoize(() =>
	/firefox/i.test(navigator.userAgent),
)
export const isSafari: Predicate = memoize(() => Boolean(window.safari))
