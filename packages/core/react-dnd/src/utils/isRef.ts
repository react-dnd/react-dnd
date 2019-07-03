export interface Ref<T> {
	current: T
}

export function isRef(obj: any) {
	return (
		// eslint-disable-next-line no-prototype-builtins
		obj !== null && typeof obj === 'object' && obj.hasOwnProperty('current')
	)
}
