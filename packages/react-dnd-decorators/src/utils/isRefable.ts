function isClassComponent(Component: any): boolean {
	return (
		Component &&
		Component.prototype &&
		typeof Component.prototype.render === 'function'
	)
}

export function isRefForwardingComponent(C: any) {
	return (
		C && C.$$typeof && C.$$typeof.toString() === 'Symbol(react.forward_ref)'
	)
}

export function isRefable(C: any): boolean {
	return isClassComponent(C) || isRefForwardingComponent(C)
}
