declare var require: any
const isClassComponent = require('recompose/isClassComponent').default

export function isRefForwardingComponent(C: any) {
	return (
		C && C.$$typeof && C.$$typeof.toString() === 'Symbol(react.forward_ref)'
	)
}

export function isRefable(C: any): boolean {
	return isClassComponent(C) || isRefForwardingComponent(C)
}
