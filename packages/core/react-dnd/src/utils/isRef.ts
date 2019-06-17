export interface Ref<T> {
	current: T
}

export function isRef(obj: any) {
	return (
		obj !== null && typeof obj === 'object' && obj.hasOwnProperty('current')
	)
}
